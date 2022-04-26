import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Item] })],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
