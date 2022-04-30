/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IResponseToken, IAccessToken } from './interface';
import { config } from '../shared/configs/config';
import * as dayjs from 'dayjs';
import { UpdateUserDto } from '../user/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(user: User): Promise<IResponseToken> {
    const loginDate = dayjs();
    await this.userService.update(user.peopleId, {
      lastLogin: loginDate.unix(),
    } as UpdateUserDto);

    return {
      accessToken: await this.sign(
        { sub: user.peopleId, roles: user.roles },
        this.getOptions('access'),
        loginDate.unix(),
      ),
      accessTokenExpirationTime: loginDate
        .add(config.get('jwt.accessTokenExpirationTime'), 's')
        .unix(),
      refreshToken: await this.sign(
        { sub: user.peopleId },
        this.getOptions('refresh'),
        loginDate.unix(),
      ),
      refreshTokenExpirationTime: loginDate
        .add(config.get('jwt.refreshTokenExpirationTime'), 's')
        .unix(),
    };
  }

  public async validateUser(dto: LoginDto): Promise<User> {
    const user = await this.userService.findByMail(dto.mail);

    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.comparePassword(dto.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  //TODO:Public and private key
  private async sign(
    payload,
    options: JwtSignOptions,
    iat: number,
  ): Promise<string> {
    return this.jwtService.signAsync(
      {
        ...payload,
        iat,
      },
      options,
    );
  }

  private getOptions(type: 'access' | 'refresh'): any {
    return {
      secret: config.get(`jwt.${type}Secret`),
      expiresIn: `${config.get(`jwt.${type}TokenExpirationTime`)}s`,
    };
  }

  public async refresh(refreshToken: string): Promise<IAccessToken> {
    try {
      const token = await this.jwtService.verifyAsync(refreshToken, {
        secret: config.get('jwt.refreshSecret'),
      } as JwtVerifyOptions);

      const loginDate = dayjs();

      if (token.exp < loginDate.unix()) {
        throw null;
      }

      await this.userService.update(token.sub, {
        lastLogin: loginDate.unix(),
      } as UpdateUserDto);

      return {
        accessToken: await this.sign(
          { sub: token.peopleId },
          this.getOptions('access'),
          loginDate.unix(),
        ),
        accessTokenExpirationTime: loginDate
          .add(config.get('jwt.accessTokenExpirationTime'), 's')
          .unix(),
      };
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }

    //   return {
    //     accessToken: await this.sign(
    //       user,
    //       this.getOptions('access'),
    //       loginDate.unix(),
    //     ),
    //     accessTokenExpirationTime: loginDate
    //       .add(config.get('jwt.accessTokenExpirationTime'), 's')
    //       .unix(),
    //   };
  }
}
