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

  public async createUse(dto: CreateUseDto): Promise<Use> {
    if ((await this.useRepository.count()) != 0) {
      if (
        await this.useRepository.findOne({
          event: await this.eventService.findOne(dto.eventId),
          item: await this.itemService.findOne(dto.itemId),
        })
      ) {
        throw new ConflictException('Existing Relationship, try using Update');
      } else {
        if (await this.verifUse(dto)) {
          const use = new Use(
            dto,
            await this.eventService.findOne(dto.eventId),
            await this.itemService.findOne(dto.itemId),
          );
          await this.useRepository.persistAndFlush(use);
          return use;
        } else {
          throw new ConflictException('Item Already Used by another Event');
        }
      }
    } else {
      const use = new Use(
        dto,
        await this.eventService.findOne(dto.eventId),
        await this.itemService.findOne(dto.itemId),
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
    wrap(use).assign(dto);
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

  public async verifUse(dto: CreateUseDto): Promise<boolean> {
    // If there already is an event using this item
    const listUses = await this.useRepository.find(
      { item: await this.itemService.findOne(dto.itemId) },
      { populate: ['item'] },
    );
    const dateStartNewEvent = (await this.eventService.findOne(dto.eventId))
      .dateStart;
    const dateEndNewEvent = (await this.eventService.findOne(dto.eventId))
      .dateEnd;
    let verif = true;
    for (const use of listUses) {
      if (
        !(
          use.event.dateStart < dateStartNewEvent &&
          use.event.dateEnd < dateStartNewEvent &&
          !(
            use.event.dateStart > dateEndNewEvent &&
            use.event.dateEnd > dateEndNewEvent
          )
        )
      ) {
        verif = false;
      }
    }
    return verif;
  }
}