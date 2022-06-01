import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Custom Packages
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => RoleModule),
    forwardRef(() => UserModule),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AuthService, UserModule],
})
export class AuthModule {}
