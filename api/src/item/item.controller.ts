import { Body, Controller, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto';
import { Item } from './item.entity';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post('create-item')
  create(@Body() item: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(item);
  }
}
