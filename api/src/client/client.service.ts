import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateClientDto } from './dto';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: EntityRepository<Client>,
  ) {}

  public async createClient(dto: CreateClientDto): Promise<Client> {
    if (await this.clientRepository.findOne({ mail: dto.mail })) {
      throw new ConflictException('Email already used');
    }
    const client = new Client(dto);
    await this.clientRepository.persistAndFlush(client);
    return client;
  }
}
