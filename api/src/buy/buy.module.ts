import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

//Custom Packages
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { Buy } from './buy.entity';
import { ClientModule } from 'src/client/client.module';
import { Client } from 'src/client/client.entity';
import { ProductModule } from 'src/product/product.module';
import { Product } from 'src/product/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Buy, Client, Product] }),
    ClientModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [BuyController],
  providers: [BuyService],
})
export class BuyModule {}
