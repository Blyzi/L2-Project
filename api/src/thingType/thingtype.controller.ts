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
import { ThingTypeService } from './thingType.service';
import { CreateThingTypeDto } from './dto';
import { UpdateThingTypeDto } from './dto';
import { ThingType } from './thingType.entity';

@Controller('thing-type')
export class ThingTypeController {
  constructor(private thingTypeService: ThingTypeService) {}

  @Post('create-thing-type')
  create(@Body() thingType: CreateThingTypeDto): Promise<ThingType> {
    return this.thingTypeService.createThingType(thingType);
  }

  @Get()
  findAll(): Promise<ThingType[]> {
    return this.thingTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) thingTypeId: number): Promise<ThingType> {
    return this.thingTypeService.findOne(thingTypeId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) thingTypeId: number,
    @Body() thingType: UpdateThingTypeDto,
  ): Promise<ThingType> {
    return this.thingTypeService.update(thingTypeId, thingType);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) thingTypeId: number): Promise<void> {
    return this.thingTypeService.delete(thingTypeId);
  }
}
