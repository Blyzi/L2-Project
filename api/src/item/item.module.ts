import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

// Custom Packages
import { Item } from './item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ThingType } from 'src/thingType/thingType.entity';
import { ThingTypeModule } from 'src/thingType/thingtype.module';
import { ThingTypeService } from 'src/thingType/thingType.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Item, ThingType] }),
    ThingTypeModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {
  constructor(private readonly thingTypeService: ThingTypeService) {}
}
