import {
  Body,
  Controller,
  Post,
  Get,
  Query,
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

  @Post('create-use')
  create(@Body() use: CreateUseDto): Promise<Use> {
    return this.useService.createUse(use);
  }

  @Get()
  findAll(): Promise<Use[]> {
    return this.useService.findAll();
  }

  @Get()
  findOne(
    @Query('idEvent', ParseIntPipe) idEvent: number,
    @Query('idItem', ParseIntPipe) idItem: number,
  ): Promise<Use> {
    return this.useService.findOne(idEvent, idItem);
  }

  @Patch()
  update(
    @Query('idEvent', ParseIntPipe) idEvent: number,
    @Query('idItem', ParseIntPipe) idItem: number,
    @Body() use: UpdateUseDto,
  ): Promise<Use> {
    return this.useService.update(use, idEvent, idItem);
  }

  @Delete()
  delete(
    @Query('idEvent', ParseIntPipe) idEvent: number,
    @Query('idItem', ParseIntPipe) idItem: number,
  ): Promise<void> {
    return this.useService.delete(idEvent, idItem);
  }
}
