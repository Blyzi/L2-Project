import { ClientModule } from './client/client.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MikroOrmModule.forRoot(), AuthModule, UserModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
