import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Custom Packages
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AuthService, UserModule],
})
export class AuthModule {}
