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

//Custom Packages
import { UseService } from './use.service';
import { CreateUseDto } from './dto';
import { UpdateUseDto } from './dto';
import { Use } from './use.entity';

@Controller('use')
export class UseController {
  constructor(private useService: UseService) {}

  @Post()
  create(
    @Param('idEvent', ParseIntPipe) idEvent: number,
    @Param('idItem', ParseIntPipe) idItem: number,
    @Body() use: CreateUseDto,
  ): Promise<Use> {
    return this.useService.createUse(idEvent, idItem, use);
  }

  @Get(':idEvent/:idItem')
  findOne(
    @Param('idEvent', ParseIntPipe) idEvent: number,
    @Param('idItem', ParseIntPipe) idItem: number,
  ): Promise<Use> {
    return this.useService.findOne(idEvent, idItem);
  }

  @Get()
  findAll(): Promise<Use[]> {
    return this.useService.findAll();
  }

  @Patch(':idEvent/:idItem')
  update(
    @Param('idEvent', ParseIntPipe) idEvent: number,
    @Param('idItem', ParseIntPipe) idItem: number,
    @Body() use: UpdateUseDto,
  ): Promise<Use> {
    return this.useService.update(use, idEvent, idItem);
  }

  @Delete(':idEvent/:idItem')
  delete(
    @Param('idEvent', ParseIntPipe) idEvent: number,
    @Param('idItem', ParseIntPipe) idItem: number,
  ): Promise<void> {
    return this.useService.delete(idEvent, idItem);
  }
}
