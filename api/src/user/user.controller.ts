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
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { Auth } from 'src/auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Auth()
  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Auth()
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) peopleId: number): Promise<User> {
    return this.userService.findOne(peopleId);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) peopleId: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(peopleId, user);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) peopleId: number): Promise<void> {
    return this.userService.delete(peopleId);
  }
}
