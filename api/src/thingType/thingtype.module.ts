import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

//Custom Packages
import { ThingType } from './thingType.entity';
import { ThingTypeController } from './thingType.controller';
import { ThingTypeService } from './thingType.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ThingType] })],
  controllers: [ThingTypeController],
  providers: [ThingTypeService],
  exports: [ThingTypeService],
})
export class ThingTypeModule {}
