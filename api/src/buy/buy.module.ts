import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

//Custom Packages
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { Buy } from './buy.entity';
import { ClientModule } from 'src/client/client.module';
import { Client } from 'src/client/client.entity';
import { ClientService } from 'src/client/client.service';
import { ProductModule } from 'src/product/product.module';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Buy, Client, Product] }),
    ClientModule,
    ProductModule,
  ],
  controllers: [BuyController],
  providers: [BuyService],
})
export class BuyModule {
  constructor(
    private readonly clientService: ClientService,
    private readonly productService: ProductService,
  ) {}
}
