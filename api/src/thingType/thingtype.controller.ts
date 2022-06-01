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
import { Auth } from '../auth/auth.decorator';

@Controller('thing-type')
export class ThingTypeController {
  constructor(private thingTypeService: ThingTypeService) {}

  @Auth()
  @Post()
  create(@Body() thingType: CreateThingTypeDto): Promise<ThingType> {
    return this.thingTypeService.createThingType(thingType);
  }

  @Auth()
  @Get()
  findAll(): Promise<ThingType[]> {
    return this.thingTypeService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) thingTypeId: number): Promise<ThingType> {
    return this.thingTypeService.findOne(thingTypeId);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) thingTypeId: number,
    @Body() thingType: UpdateThingTypeDto,
  ): Promise<ThingType> {
    return this.thingTypeService.update(thingTypeId, thingType);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) thingTypeId: number): Promise<void> {
    return this.thingTypeService.delete(thingTypeId);
  }
}
