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
    console.log(
      this.reflector.get<ACTIONS[]>('permissions', context.getHandler()),
    );
    request.user = await this.verifyToken(request);
    return request.user !== null;
  }

  private async verifyToken(request): Promise<User> {
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

    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new ForbiddenException('User not found');
    } else if (user.lastLogin !== payload.iat) {
      throw new ForbiddenException('User already logged in');
    }

    if (!this.checkClaims(request, user.roles)) {
      throw new ForbiddenException('User does not have permission');
    }

    return user;
  }

  private checkClaims(request, permissions): boolean {
    const claims = this.reflector.get<{ key: ACTIONS }>(
      'claims',
      request.handler,
    );
    if (!claims) {
      return true;
    }
    return Object.keys(claims).some((key) => {
      return permissions[key] === claims[key] || claims[key] === ACTIONS.MANAGE;
    });
  }
}
