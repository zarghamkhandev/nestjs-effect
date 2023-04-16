import { BadRequestException, Controller, Get } from '@nestjs/common';
import { UsersService } from './services/users.service';
import * as Effect from '@effect/io/Effect';
import { UsersNotFoundException } from './errors';

@Controller('users')
export class UsersController {
  constructor(private readonly usersEffect: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersDAO.create(createUserDto);
  // }

  @Get()
  async findAll() {
    const users = await Effect.runPromise(this.usersEffect.findAllUsers());
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
