import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';

// Custom Packages
import { ItemService } from './item.service';
import { CreateItemDto } from './dto';
import { UpdateItemDto } from './dto';
import { Item } from './item.entity';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  //Pour le post, pas besoin de sous endpoint
  @Post()
  create(@Body() item: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(item);
  }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) thingId: number): Promise<Item> {
    return this.itemService.findOne(thingId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) thingId: number,
    @Body() item: UpdateItemDto,
  ): Promise<Item> {
    return this.itemService.update(thingId, item);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) thingId: number): Promise<void> {
    return this.itemService.delete(thingId);
  }
}
