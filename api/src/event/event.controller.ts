import { Body, Controller, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto';
import { Event } from './event.entity';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('create-event')
  create(@Body() event: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(event);
  }
}
