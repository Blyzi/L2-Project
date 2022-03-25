import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { EventModule } from './event/event.module';
import { EventController } from './event/event.controller';
import { ItemsModule } from './items/items.module';
import { ItemsController } from './items/items.controller';
import { TeamModule } from './team/team.module';
import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { UserModule } from './users/user.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    AuthModule,
    EventModule,
    ItemsModule,
    TeamModule,
    UserModule,
    MikroOrmModule.forRoot(),
  ],
  controllers: [
    AuthController,
    EventController,
    ItemsController,
    TeamController,
    UserController,
    AppController,
  ],
  providers: [TeamService, UserService, AppService, AuthService],
})
export class AppModule {}
