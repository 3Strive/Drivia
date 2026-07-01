import { CreateUser, SERVICES, UpdateUserDto } from '@drivia/utils';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { firstValueFrom } from 'rxjs';
import { User } from '@drivia/db';

@ApiTags('users')
@Controller('/user/')
export class UserController {
  constructor(@Inject(SERVICES.USER_SERVICE) private userClient: ClientProxy) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUser): Promise<User> {
    return await firstValueFrom(this.userClient.send('create', payload));
  }
  @Put('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(ParseUUIDPipe) userId: string,
    @Body(ValidationPipe) payload: UpdateUserDto,
  ): Promise<CreateUser | { [key: string]: unknown }> {
    return await firstValueFrom(this.userClient.send('update', payload));
  }

  @Get('findOne/:userId')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('userId') userId: string,
  ): Promise<CreateUser | { [key: string]: unknown }> {
    return await firstValueFrom(this.userClient.send('findOne', userId));
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<CreateUser[] | { [key: string]: unknown }> {
    return await firstValueFrom(this.userClient.send('findAll', {}));
  }
}
