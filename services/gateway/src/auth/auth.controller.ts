import { User } from '@drivia/db';
import { SERVICES, SignInDto, type TRequest } from '@drivia/utils';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Throttle } from '@nestjs/throttler';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(SERVICES.AUTH_SERVICE) private authClient: ClientProxy) {}

  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @Post('/signin')
  async signIn(@Body() payload: SignInDto): Promise<Omit<User, 'password'>> {
    return await firstValueFrom(this.authClient.send('signin', payload));
  }

  @HttpCode(HttpStatus.OK)
  @Get('/profile')
  async getProfile(@Request() req: TRequest): Promise<Omit<User, 'password'>> {
    return await firstValueFrom(this.authClient.send('profile', req.user.id));
  }
}
