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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto';
import { UpdateClientDto } from './dto';
import { Client } from './client.entity';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('register')
  create(@Body() client: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(client);
  }

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) peopleId: number): Promise<Client> {
    return this.clientService.findOne(peopleId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) peopleId: number,
    @Body() client: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(peopleId, client);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) peopleId: number): Promise<void> {
    return this.clientService.delete(peopleId);
  }
}
