import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import * as Effect from '@effect/io/Effect';
import { CreateUserDto } from './dto/create-user.dto';
import { pipe } from '@effect/data/Function';
import { logErrorLabel, logErrorMessage } from '../utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await Effect.runPromise(
      pipe(this.usersService.createUser(createUserDto), logErrorMessage),
    );
    return user;
  }

  @Get()
  async findAll() {
    const users = await Effect.runPromise(this.usersService.getUsers());
    return users;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersDAO.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersDAO.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersDAO.remove(+id);
  // }
}
