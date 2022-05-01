import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { CreateThingTypeDto } from './dto';
import { UpdateThingTypeDto } from './dto';
import { ThingType } from './thingType.entity';

@Injectable()
export class ThingTypeService {
  constructor(
    @InjectRepository(ThingType)
    private readonly thingTypeRepository: EntityRepository<ThingType>,
  ) {}

  public async createThingType(dto: CreateThingTypeDto): Promise<ThingType> {
    const thingType = new ThingType(dto);
    await this.thingTypeRepository.persistAndFlush(thingType);
    return thingType;
  }

  public async findAll(): Promise<ThingType[]> {
    return this.thingTypeRepository.findAll();
  }

  public async findOne(thingTypeId: number): Promise<ThingType> {
    return await this.thingTypeRepository.findOneOrFail({
      thingTypeId,
    });
  }

  public async update(
    thingTypeId: number,
    dto: UpdateThingTypeDto,
  ): Promise<ThingType> {
    const thingType = await this.thingTypeRepository.findOneOrFail({
      thingTypeId,
    });
    wrap(thingType).assign(dto);
    await this.thingTypeRepository.flush();
    return thingType;
  }

  public async delete(thingTypeId: number): Promise<void> {
    await this.thingTypeRepository.removeAndFlush(
      await this.thingTypeRepository.findOneOrFail({
        thingTypeId,
      }),
    );
  }
}
