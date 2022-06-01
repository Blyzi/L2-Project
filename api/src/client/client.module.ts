import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ClientController } from './client.controller';
import { Client } from './client.entity';
import { ClientService } from './client.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Client] }), AuthModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
