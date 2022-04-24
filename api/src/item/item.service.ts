import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: EntityRepository<Item>,
  ) {}

  public async createItem(dto: CreateItemDto): Promise<Item> {
    const item = new Item(dto);
    await this.itemRepository.persistAndFlush(item);
    return item;
  }
}
