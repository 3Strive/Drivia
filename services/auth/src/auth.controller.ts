import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '@drivia/utils';
import { User } from '@drivia/db';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('signin')
  async emailLogin(
    @Payload() data: SignInDto,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> {
    return await this.authService.signIn(data);
  }

  @MessagePattern('profile')
  async getProfile(
    @Payload() id: string,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> {
    return await this.authService.getProfile(id);
  }
}
