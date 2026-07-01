import {
  CreateUser,
  GetUsersDto,
  PaginationData,
  UpdateUserDto,
} from '@drivia/utils';
import { Controller, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserService } from './user.service';
import { User } from '@drivia/db';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('find-by-email')
  async findByEmail(@Payload() data: { email: string }): Promise<User | null> {
    return await this.userService.findByEmail(data.email);
  }

  @MessagePattern('findOne')
  async get(@Payload() data: { userId: string }): Promise<User | null> {
    return await this.userService.get(data.userId);
  }

  @MessagePattern('create')
  async create(@Payload() data: CreateUser): Promise<User | null> {
    return await this.userService.create(data);
  }

  @MessagePattern('update')
  async update(
    @Param() userId: string,
    @Payload() data: UpdateUserDto,
  ): Promise<User | null> {
    return await this.userService.update(userId, data);
  }

  @MessagePattern('findAll')
  async getAll(data: GetUsersDto): Promise<PaginationData<Array<User>>> {
    return await this.userService.getAll(data);
  }
}
