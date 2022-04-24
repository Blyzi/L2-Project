import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
