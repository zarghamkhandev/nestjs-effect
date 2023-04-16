import { Controller, Get } from '@nestjs/common';
import { UsersDAO } from './dao/users.dao';
import { UsersEffect } from './effects/users.effect';

@Controller('users')
export class UsersController {
  constructor(private readonly usersEffect: UsersEffect) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersDAO.create(createUserDto);
  // }

  @Get()
  findAll() {}

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
