import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';

//Custom Packages
import { EventService } from './event.service';
import { CreateEventDto } from './dto';
import { UpdateEventDto } from './dto';
import { Event } from './event.entity';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('create-event')
  create(@Body() event: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(event);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) eventId: number): Promise<Event> {
    return this.eventService.findOne(eventId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() event: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.update(eventId, event);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) eventId: number): Promise<void> {
    return this.eventService.delete(eventId);
  }
}
