import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRuntime } from './users.runtime';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { AnotherService } from './another.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersRuntime, AnotherService],
})
export class UsersModule {}
