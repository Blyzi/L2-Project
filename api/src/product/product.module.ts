import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

//Custom Packages
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ThingType } from '../thingType/thingType.entity';
import { ThingTypeModule } from '../thingType/thingtype.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Product, ThingType] }),
    ThingTypeModule,
    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
