import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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
    const item = new Item(
      dto,
      await this.thingTypeService.findOne(dto.thingType),
    );
    await this.itemRepository.persistAndFlush(item);
    return item;
  }

  public async findAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  public async findOne(thingId: number): Promise<Item> {
    try {
      return await this.itemRepository.findOneOrFail({
        thingId,
      });
    } catch {
      throw new NotFoundException('Item not found');
    }
  }

  public async update(thingId: number, dto: UpdateItemDto): Promise<Item> {
    try {
      const item = await this.itemRepository.findOneOrFail({
        thingId,
      });
      wrap(item).assign(dto);
      await this.itemRepository.flush();
      return item;
    } catch {
      throw new NotFoundException('Item not found');
    }
  }

  public async delete(thingId: number): Promise<void> {
    try {
      await this.itemRepository.removeAndFlush(
        await this.itemRepository.findOneOrFail({
          thingId,
        }),
      );
    } catch {
      throw new NotFoundException('Item not found');
    }
  }
}
