import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

//Custom Packages
import { CreateEventDto } from './dto';
import { UpdateEventDto } from './dto';
import { Event } from './event.entity';
import { ClientService } from 'src/client/client.service';
import { ItemService } from 'src/item/item.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EntityRepository<Event>,
    private readonly clientService: ClientService,
    private readonly itemService: ItemService,
    private readonly userService: UserService,
  ) {}

  public async createEvent(dto: CreateEventDto): Promise<Event> {
    const event = new Event(dto);

    if (typeof dto.usersId !== 'undefined') {
      for (const userId of dto.usersId) {
        event.users.add(await this.userService.findOne(userId));
      }
    }

    if (typeof dto.clientsId !== 'undefined') {
      for (const clientId of dto.clientsId) {
        event.clients.add(await this.clientService.findOne(clientId));
      }
    }

    await this.eventRepository.persistAndFlush(event);
    return event;
  }

  public async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll({
      populate: ['users', 'items', 'clients'],
    });
  }

  public async findOne(eventId: number): Promise<Event> {
    return await this.eventRepository.findOneOrFail(
      {
        eventId,
      },
      {
        populate: ['users', 'items', 'clients'],
      },
    );
  }

  public async findByDate(Eventstart: Date, Eventend: Date): Promise<Event> {
    return await this.eventRepository.findOneOrFail({
      start: Eventstart,
      end: Eventend,
    });
  }

  public async update(eventId: number, dto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOneOrFail({
      eventId,
    });
    await event.users.init();
    if (typeof dto.usersId !== 'undefined') {
      event.users.removeAll();
      for (const userId of dto.usersId) {
        event.users.add(await this.userService.findOne(userId));
      }
    }
    await event.clients.init();
    if (typeof dto.clientsId !== 'undefined') {
      event.clients.removeAll();
      for (const clientId of dto.clientsId) {
        event.clients.add(await this.clientService.findOne(clientId));
      }
    }

    wrap(event).assign(dto);
    await this.eventRepository.flush();
    return event;
  }

  public async delete(eventId: number): Promise<void> {
    await this.eventRepository.removeAndFlush(
      await this.eventRepository.findOneOrFail({
        eventId,
      }),
    );
  }
}
