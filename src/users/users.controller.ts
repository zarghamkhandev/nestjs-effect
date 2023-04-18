import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersRuntime } from './users.runtime';
import { CreateUserDto } from './dto/create-user.dto';
import { logError } from '../utils';
import { pipe } from '../prelude';
import { createUser, getUsersEffect } from './pure';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRuntime: UsersRuntime) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersRuntime.runPromise(pipe(createUser(createUserDto), logError));
    return user;
  }

  @Get()
  async findAll() {
    const users = await this.usersRuntime.runPromise(getUsersEffect);
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
