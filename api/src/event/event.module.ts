import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

// Custom Packages
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { EventService } from './event.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Event] }), AuthModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {
  constructor(private readonly eventService: EventService) {}
}
