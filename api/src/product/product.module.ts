import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

//Custom Packages
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ThingType } from 'src/thingType/thingType.entity';
import { ThingTypeModule } from 'src/thingType/thingtype.module';
import { ThingTypeService } from 'src/thingType/thingType.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Product, ThingType] }),
    ThingTypeModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {
  constructor(private readonly thingTypeService: ThingTypeService) {}
}
