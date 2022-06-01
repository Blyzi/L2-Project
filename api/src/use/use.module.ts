import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

//Custom Packages
import { UseService } from './use.service';
import { UseController } from './use.controller';
import { Use } from './use.entity';
import { EventModule } from 'src/event/event.module';
import { Event } from 'src/event/event.entity';
import { ItemModule } from 'src/item/item.module';
import { Item } from 'src/item/item.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Use, Event, Item] }),
    EventModule,
    ItemModule,
    AuthModule,
  ],
  controllers: [UseController],
  providers: [UseService],
})
export class UseModule {}
