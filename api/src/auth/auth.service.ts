import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

//Custom Packages
import { User } from '../user/user.entity';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  public async login(dto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      mail: dto.mail,
    });
    if (!user.comparePassword(dto.password)) {
      throw null;
    }
    return user;
  }
}
