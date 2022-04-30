/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Post,
  Response,
  HttpCode,
  Request,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { config } from '../shared/configs/config';
import { Response as Res, Request as Req, CookieOptions } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private static cookieOption = {
    secure: (maxAge) =>
      ({
        httpOnly: true,
        sameSite: true,
        maxAge: maxAge * 1000,
        signed: true,
        secure: config.get('api.nodeEnv') === 'prod',
      } as CookieOptions),
    basic: (maxAge) =>
      ({
        sameSite: true,
        maxAge: maxAge * 1000,
        secure: config.get('api.nodeEnv') === 'prod',
      } as CookieOptions),
  };

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Response({ passthrough: true }) res: Res,
  ): Promise<User> {
    const userLogin = await this.authService.validateUser(user);
    const auth = await this.authService.login(userLogin);

    res
      .cookie(
        'accesToken',
        auth.accessToken,
        AuthController.cookieOption.secure(
          config.get('jwt.accessTokenExpirationTime'),
        ),
      )
      .cookie(
        'accessTokenExpirationTime',
        auth.accessTokenExpirationTime,
        AuthController.cookieOption.basic(
          config.get('jwt.accessTokenExpirationTime'),
        ),
      )
      .cookie(
        'refreshToken',
        auth.refreshToken,
        AuthController.cookieOption.secure(
          config.get('jwt.refreshTokenExpirationTime'),
        ),
      )
      .cookie(
        'refreshTokenExpirationTime',
        auth.refreshTokenExpirationTime,
        AuthController.cookieOption.basic(
          config.get('jwt.refreshTokenExpirationTime'),
        ),
      );

    return userLogin;
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(
    @Request() req: Req,
    @Response({ passthrough: true }) res: Res,
  ): Promise<void> {
    const auth = await this.authService.refresh(
      req?.signedCookies?.refreshToken,
    );

    res
      .cookie(
        'accesToken',
        auth.accessToken,
        AuthController.cookieOption.secure(
          config.get('jwt.accessTokenExpirationTime'),
        ),
      )
      .cookie(
        'accessTokenExpirationTime',
        auth.accessTokenExpirationTime,
        AuthController.cookieOption.basic(
          config.get('jwt.accessTokenExpirationTime'),
        ),
      );
  }

  @HttpCode(200)
  @Post('test')
  async test(@Request() req: Req): Promise<any> {
    return { a: req.signedCookies, b: req.cookies };

    // const auth = this.authService.refresh(req?.cookies?.refreshToken);
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Response({ passthrough: true }) res: Res): Promise<void> {
    res
      .clearCookie('accesToken')
      .clearCookie('accessTokenExpirationTime')
      .clearCookie('refreshToken')
      .clearCookie('refreshTokenExpirationTime');
  }
}
