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
import { Auth } from '../auth/auth.decorator';

@Controller('buy')
export class BuyController {
  constructor(private buyService: BuyService) {}

  @Auth()
  @Post()
  create(@Body() buy: CreateBuyDto): Promise<Buy> {
    return this.buyService.createBuy(buy);
  }

  @Auth()
  @Get()
  findAll(): Promise<Buy[]> {
    return this.buyService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) buyId: number): Promise<Buy> {
    return this.buyService.findOne(buyId);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) buyId: number,
    @Body() buy: UpdateBuyDto,
  ): Promise<Buy> {
    return this.buyService.update(buyId, buy);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) buyId: number): Promise<void> {
    return this.buyService.delete(buyId);
  }
}
