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
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto';
import { UpdateBuyDto } from './dto';
import { Buy } from './buy.entity';

@Controller('buy')
export class BuyController {
  constructor(private buyService: BuyService) {}

  @Post('create-buy')
  create(@Body() buy: CreateBuyDto): Promise<Buy> {
    return this.buyService.createBuy(buy);
  }

  @Get()
  findAll(): Promise<Buy[]> {
    return this.buyService.findAll();
  }

  @Get()
  findOne(
    @Query('idClient', ParseIntPipe) idClient: number,
    @Query('idProduct', ParseIntPipe) idProduct: number,
  ): Promise<Buy> {
    return this.buyService.findOne(idClient, idProduct);
  }

  @Patch()
  update(
    @Query('idClient', ParseIntPipe) idClient: number,
    @Query('idProduct', ParseIntPipe) idProduct: number,
    @Body() buy: UpdateBuyDto,
  ): Promise<Buy> {
    return this.buyService.update(buy, idClient, idProduct);
  }

  @Delete()
  delete(
    @Query('idClient', ParseIntPipe) idClient: number,
    @Query('idProduct', ParseIntPipe) idProduct: number,
  ): Promise<void> {
    return this.buyService.delete(idClient, idProduct);
  }
}
