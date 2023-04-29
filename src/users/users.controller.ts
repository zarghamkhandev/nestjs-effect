import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { createUser, getUser, getUsers } from './pure';
import { GlobalRuntime } from '../global.runtime';

@Controller('users')
export class UsersController {
  constructor(private readonly runtime: GlobalRuntime) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.runtime.runPromise(createUser(createUserDto));
    return user;
  }

  @Get()
  async findAll() {
    const users = await this.runtime.runPromise(getUsers);
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.runtime.runPromise(getUser(id));
    return user;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersDAO.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersDAO.remove(+id);
  // }
}
