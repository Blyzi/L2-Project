import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto';
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
}
