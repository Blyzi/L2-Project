import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, ConflictException } from '@nestjs/common';
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
    private readonly eventService: EventService,
    private readonly itemService: ItemService,
  ) {}

  public async createUse(
    eventId: number,
    itemId: number,
    dto: CreateUseDto,
  ): Promise<Use> {
    if (
      await this.useRepository.findOne({
        event: await this.eventService.findOne(eventId),
        item: await this.itemService.findOne(itemId),
      })
    ) {
      throw new ConflictException('Existing Relationship, try using Update');
    } else {
      const use = new Use(
        dto.amount,
        await this.eventService.findOne(eventId),
        await this.itemService.findOne(itemId),
      );
      await this.useRepository.persistAndFlush(use);
      return use;
    }
  }

  public async findAll(): Promise<Use[]> {
    return this.useRepository.findAll();
  }

  public async findOne(eventId: number, itemId: number): Promise<Use> {
    return await this.useRepository.findOneOrFail({
      event: await this.eventService.findOne(eventId),
      item: await this.itemService.findOne(itemId),
    });
  }

  public async update(
    dto: UpdateUseDto,
    eventId: number,
    itemId: number,
  ): Promise<Use> {
    const use = await this.useRepository.findOneOrFail({
      event: await this.eventService.findOne(eventId),
      item: await this.itemService.findOne(itemId),
    });

    wrap(use).assign(dto as any);
    await this.useRepository.flush();
    return use;
  }

  public async delete(eventId: number, itemId: number): Promise<void> {
    await this.useRepository.removeAndFlush(
      await this.useRepository.findOneOrFail({
        event: await this.eventService.findOne(eventId),
        item: await this.itemService.findOne(itemId),
      }),
    );
  }

  public async verifUse(
    eventId: number,
    itemId: number,
    dto: CreateUseDto | UpdateUseDto,
  ): Promise<number> {
    // If there already is an event using this item
    const listUses = await this.useRepository.find(
      { item: await this.itemService.findOne(itemId) },
      { populate: ['item'] },
    );
    const startNewEvent = (await this.eventService.findOne(eventId)).start;
    const endNewEvent = (await this.eventService.findOne(eventId)).end;
    let verif = (await this.itemService.findOne(itemId)).stock;
    for (const use of listUses) {
      if (
        !(
          use.event.start < startNewEvent &&
          use.event.end < startNewEvent &&
          !(use.event.start > endNewEvent && use.event.end > endNewEvent)
        )
      ) {
        verif -= use.amount;
      }
    }
    return verif;
  }
}
