import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

//Custom Packages
import { UseService } from './use.service';
import { UseController } from './use.controller';
import { Use } from './use.entity';
import { EventModule } from 'src/event/event.module';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { ItemModule } from 'src/item/item.module';
import { ItemService } from 'src/item/item.service';
import { Item } from 'src/item/item.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Use, Event, Item] }),
    EventModule,
    ItemModule,
  ],
  controllers: [UseController],
  providers: [UseService],
})
export class UseModule {
  constructor(
    private readonly eventService: EventService,
    private readonly productService: ItemService,
  ) {}
}
