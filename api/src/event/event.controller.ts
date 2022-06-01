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
import { Auth } from '../auth/auth.decorator';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Auth()
  @Post('')
  create(@Body() event: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(event);
  }

  @Auth()
  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) eventId: number): Promise<Event> {
    return this.eventService.findOne(eventId);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() event: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.update(eventId, event);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) eventId: number): Promise<void> {
    return this.eventService.delete(eventId);
  }
}
