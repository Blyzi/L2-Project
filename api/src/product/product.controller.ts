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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto';
import { UpdateProductDto } from './dto';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) thingId: number): Promise<Product> {
    return this.productService.findOne(thingId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) thingId: number,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(thingId, product);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) thingId: number): Promise<void> {
    return this.productService.delete(thingId);
  }
}
