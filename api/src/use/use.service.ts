import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

//Custom Packages
import { CreateUseDto } from './dto';
import { UpdateUseDto } from './dto';
import { Use } from './use.entity';
import { EventService } from 'src/event/event.service';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class UseService {
  constructor(
    @InjectRepository(Use)
    private readonly useRepository: EntityRepository<Use>,
    private readonly eventService: EventService, //private readonly itemService: ItemService,
  ) {}

  public async createUse(dto: CreateUseDto): Promise<Use> {
    const use = new Use(
      dto,
      await this.eventService.findOne(dto.eventId),
      //await this.itemService.findOne(dto.itemId),
    );
    await this.useRepository.persistAndFlush(use);
    return use;
  }

  public async findAll(): Promise<Use[]> {
    return this.useRepository.findAll();
  }

  public async findOne(eventId: number, itemId: number): Promise<Use> {
    return await this.useRepository.findOneOrFail({
      event: await this.eventService.findOne(eventId),
      //item: await this.itemService.findOne(itemId),
    });
  }

  public async update(dto: UpdateUseDto, eventId, itemId): Promise<Use> {
    const use = await this.useRepository.findOneOrFail({
      event: await this.eventService.findOne(eventId),
      //item: await this.itemService.findOne(itemId),
    });
    wrap(use).assign(dto);
    await this.useRepository.flush();
    return use;
  }

  public async delete(eventId: number, itemId: number): Promise<void> {
    await this.useRepository.removeAndFlush(
      await this.useRepository.findOneOrFail({
        event: await this.eventService.findOne(eventId),
        //item: await this.itemService.findOne(itemId),
      }),
    );
  }
}
