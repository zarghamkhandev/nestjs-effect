import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersDAO } from './dao/users.dao';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersDAO: UsersDAO) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersDAO.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersDAO.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersDAO.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersDAO.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersDAO.remove(+id);
  }
}
