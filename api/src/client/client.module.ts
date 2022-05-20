import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { Client } from './client.entity';
import { ClientService } from './client.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Client] })],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
