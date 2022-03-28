/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login') //make a route (POST Request : auth/signup)
  signup() {
    return 'I am logged in';
  }
  @Post('register')
  signin() {
    return 'I am resgistered';
  }
}
