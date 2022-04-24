/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() user: LoginDto): Promise<User> {
    return this.authService.login(user);
  }
}
