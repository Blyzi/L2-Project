/*
https://docs.nestjs.com/guards#guards
*/

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { Reflector } from '@nestjs/core';
import { ACTIONS } from 'src/shared/enum/Actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //console.log(context.switchToHttp().getRequest());
    const request = context.switchToHttp().getRequest();
    request.user = await this.verifyToken(context, request);
    return request.user !== null;
  }

  private async verifyToken(context, request): Promise<User> {
    const token = request?.signedCookies?.accessToken;
    if (!token) {
      throw new ForbiddenException('Token is missing');
    }

    if (
      !(await this.jwtService.verifyAsync(
        token,
        this.authService.getOptions('access'),
      ))
    ) {
      throw new ForbiddenException('Token is invalid');
    }
    const payload = this.jwtService.decode(token) as { [key: string]: any };

    if (!payload) {
      throw new ForbiddenException('Token is invalid');
    }

    const user = await this.userService.findOne(payload.sub);
    if (user.lastLogin !== payload.iat) {
      throw new ForbiddenException('User already logged in');
    }

    if (!this.checkClaims(context, user.roles)) {
      throw new ForbiddenException('User does not have permissions');
    }
    return user;
  }

  private checkClaims(context, permissions): boolean {
    const claims = this.reflector.get('claims', context.handler);
    if (claims.length === 0) {
      return true;
    }
    return Object.keys(claims).some(
      (key) =>
        permissions[key] === claims[key] || claims[key] === ACTIONS.MANAGE,
    );
  }
}
