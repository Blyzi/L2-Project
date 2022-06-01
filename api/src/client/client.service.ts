import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, ConflictException } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// Custom Packages
import { CreateClientDto } from './dto';
import { UpdateClientDto } from './dto';
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

  public async findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  public async findOne(peopleId: number): Promise<Client> {
    return await this.clientRepository.findOneOrFail({
      peopleId,
    });
  }

  public async update(peopleId: number, dto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.findOneOrFail({
      peopleId,
    });
    wrap(client).assign(dto);
    await this.clientRepository.flush();
    return client;
  }

  public async delete(peopleId: number): Promise<void> {
    await this.clientRepository.removeAndFlush(
      await this.clientRepository.findOneOrFail({
        peopleId,
      }),
    );
  }
}
