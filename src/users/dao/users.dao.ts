import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersDAO {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  // TODO: handle case when there is no entity
  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  // TODO: handle null case here
  async findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { id },
    }) as unknown as UserEntity;
  }
}
