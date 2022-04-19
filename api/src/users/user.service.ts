import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto';
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
}
