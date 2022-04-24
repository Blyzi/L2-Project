/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '../user/user.entity';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  public async login(dto: LoginDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        mail: dto.mail,
      });
      if (!user.comparePassword(dto.password)) {
        throw null;
      }
      return user;
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
