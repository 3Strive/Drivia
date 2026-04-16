import { UserModel } from '@drivia/db';
import {
  CreateUser,
  GetUsersDto,
  PaginationData,
  UpdateUserDto,
} from '@drivia/utils';
import { Controller, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('find-by-email')
  async findByEmail(
    @Payload() data: { email: string },
  ): Promise<UserModel | null> {
    return await this.userService.findByEmail(data.email);
  }

  @MessagePattern('getUser')
  async get(@Payload() data: { userId: string }): Promise<UserModel | null> {
    return await this.userService.get(data.userId);
  }

  @MessagePattern('create')
  async create(@Payload() data: CreateUser): Promise<UserModel | null> {
    return await this.userService.create(data);
  }

  @MessagePattern('update')
  async update(
    @Param() userId: string,
    @Payload() data: UpdateUserDto,
  ): Promise<UserModel | null> {
    return await this.userService.update(userId, data);
  }

  @MessagePattern('getAllUsers')
  async getAll(data: GetUsersDto): Promise<PaginationData<Array<UserModel>>> {
    return await this.userService.getAll(data);
  }
}
