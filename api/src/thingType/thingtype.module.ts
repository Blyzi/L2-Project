import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ThingTypeController } from './thingtype.controller';
import { ThingTypeService } from './thingtype.service';
import { ThingType } from './thingType.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ThingType] })],
  controllers: [ThingTypeController],
  providers: [ThingTypeService],
  exports: [ThingTypeService],
})
export class ThingTypeModule {}
