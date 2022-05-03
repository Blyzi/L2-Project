import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

//Custom Packages
import { CreateEventDto } from './dto';
import { UpdateEventDto } from './dto';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EntityRepository<Event>,
  ) {}

  public async createEvent(dto: CreateEventDto): Promise<Event> {
    const event = new Event(dto);
    await this.eventRepository.persistAndFlush(event);
    return event;
  }

  public async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  public async findOne(eventId: number): Promise<Event> {
    return await this.eventRepository.findOneOrFail({
      eventId,
    });
  }

  public async findByDate(
    EventDateStart: Date,
    EventDateEnd: Date,
  ): Promise<Event> {
    return await this.eventRepository.findOneOrFail({
      dateStart: EventDateStart,
      dateEnd: EventDateEnd,
    });
  }

  public async update(eventId: number, dto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOneOrFail({
      eventId,
    });
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
