import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, ConflictException } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// Custom Packages
import { CreateItemDto } from './dto';
import { UpdateItemDto } from './dto';
import { Item } from './item.entity';
import { ThingTypeService } from 'src/thingType/thingType.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: EntityRepository<Item>,
    private readonly thingTypeService: ThingTypeService,
  ) {}

  public async createItem(dto: CreateItemDto): Promise<Item> {
    if (await this.itemRepository.findOne({ name: dto.name })) {
      throw new ConflictException('Name already used');
    }

    const item = new Item(dto);
    if (dto.thingTypeId) {
      item.thingType = await this.thingTypeService.findOne(dto.thingTypeId);
    }

    await this.itemRepository.persistAndFlush(item);
    return item;
  }

  public async findAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  public async findOne(thingId: number): Promise<Item> {
    return await this.itemRepository.findOneOrFail({
      thingId,
    });
  }

  public async update(thingId: number, dto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.findOneOrFail({
      thingId,
    });

    if (dto.thingTypeId != undefined) {
      item.thingType = await this.thingTypeService.findOne(dto.thingTypeId);
    }
    wrap(item).assign(dto);
    await this.itemRepository.flush();
    return item;
  }

  public async delete(thingId: number): Promise<void> {
    await this.itemRepository.removeAndFlush(
      await this.itemRepository.findOneOrFail({
        thingId,
      }),
    );
  }
}
