import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

// Custom Packages
import { Item } from './item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ThingType } from '../thingType/thingType.entity';
import { ThingTypeModule } from '../thingType/thingtype.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Item, ThingType] }),
    ThingTypeModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
