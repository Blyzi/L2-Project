import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

// Custom Packages
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { ClientModule } from 'src/client/client.module';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Event] }),
    UserModule,
    ClientModule,
    ItemModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {
  constructor(private readonly eventService: EventService) {}
}
