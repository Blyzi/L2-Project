import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
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
    try {
      return await this.userRepository.findOneOrFail({
        peopleId,
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  public async update(peopleId: number, dto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        peopleId,
      });
      wrap(user).assign(dto);
      await user.setPassword(dto.password);
      await this.userRepository.flush();
      return user;
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  public async delete(peopleId: number): Promise<void> {
    try {
      await this.userRepository.removeAndFlush(
        await this.userRepository.findOneOrFail({
          peopleId,
        }),
      );
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
