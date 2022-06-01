import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

// Custom Packages
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Event] }), AuthModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {
  constructor(private readonly eventService: EventService) {}
}
