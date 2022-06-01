import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, ConflictException } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// Custom Packages
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    if (await this.userRepository.findOne({ mail: dto.mail })) {
      throw new ConflictException('Email already used');
    }
    const user = new User(dto);
    await user.setPassword(dto.password);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findOne(peopleId: number): Promise<User> {
    return await this.userRepository.findOneOrFail({
      peopleId,
    });
  }

  public async update(peopleId: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      peopleId,
    });
    wrap(user).assign(dto);
    if (typeof dto.password !== 'undefined') {
      await user.setPassword(dto.password);
    }
    await this.userRepository.flush();
    return user;
  }

  public async delete(peopleId: number): Promise<void> {
    await this.userRepository.removeAndFlush(
      await this.userRepository.findOneOrFail({
        peopleId,
      }),
    );
  }

  public async findByMail(mail: string): Promise<User> {
    return await this.userRepository.findOne({ mail });
  }
}
