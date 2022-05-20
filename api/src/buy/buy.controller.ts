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
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto';
import { UpdateBuyDto } from './dto';
import { Buy } from './buy.entity';

@Controller('buy')
export class BuyController {
  constructor(private buyService: BuyService) {}

  @Post()
  create(@Body() buy: CreateBuyDto): Promise<Buy> {
    return this.buyService.createBuy(buy);
  }

  @Get()
  findAll(): Promise<Buy[]> {
    return this.buyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) buyId: number): Promise<Buy> {
    return this.buyService.findOne(buyId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) buyId: number,
    @Body() buy: UpdateBuyDto,
  ): Promise<Buy> {
    return this.buyService.update(buyId, buy);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) buyId: number): Promise<void> {
    return this.buyService.delete(buyId);
  }
}
