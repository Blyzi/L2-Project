import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

// Custom Packages
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { ACTIONS } from '../shared/enum/Actions';

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
      throw new UnauthorizedException('Token is missing');
    }

    if (
      !(await this.jwtService.verifyAsync(
        token,
        this.authService.getOptions('access'),
      ))
    ) {
      throw new UnauthorizedException('Token is invalid');
    }
    const payload = this.jwtService.decode(token) as { [key: string]: any };

    if (!payload) {
      throw new UnauthorizedException('Token is invalid');
    }

    const user = await this.userService.findOne(payload.sub);
    if (user.lastLogin !== payload.iat) {
      throw new UnauthorizedException('User already logged in');
    }

    if (!this.checkClaims(context, user.role)) {
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
