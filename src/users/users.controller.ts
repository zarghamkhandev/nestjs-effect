import { BadRequestException, Controller, Get } from '@nestjs/common';
import { UsersEffect } from './effects/users.effect';
import * as Effect from '@effect/io/Effect';
import { UsersNotFoundException } from './errors';

@Controller('users')
export class UsersController {
  constructor(private readonly usersEffect: UsersEffect) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersDAO.create(createUserDto);
  // }

  @Get()
  async findAll() {
    return Effect.runPromise(this.usersEffect.findAllUsers())
      .then((res) => {
        console.log(res);
      })
      .catch((err: UsersNotFoundException) => {
        console.log(err);
        throw new BadRequestException();
      });
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
