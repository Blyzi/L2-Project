import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto';
import { Client } from './client.entity';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('register')
  create(@Body() client: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(client);
  }
}
