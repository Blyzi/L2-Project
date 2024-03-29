import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

// Custom Packages
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

import { ClientModule } from './client/client.module';
import { EventModule } from './event/event.module';
import { ItemModule } from './item/item.module';
import { TeamModule } from './team/team.module';
import { BuyModule } from './buy/buy.module';
import { ThingTypeModule } from './thingType/thingtype.module';
import { UseModule } from './use/use.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    RoleModule,
    AuthModule,
    ClientModule,
    EventModule,
    ItemModule,
    TeamModule,
    BuyModule,
    ThingTypeModule,
    UseModule,
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
