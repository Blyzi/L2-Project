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
import { Auth } from 'src/auth/auth.decorator';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Auth()
  @Post()
  create(@Body() client: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(client);
  }

  @Auth()
  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) peopleId: number): Promise<Client> {
    return this.clientService.findOne(peopleId);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) peopleId: number,
    @Body() client: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(peopleId, client);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) peopleId: number): Promise<void> {
    return this.clientService.delete(peopleId);
  }
}
