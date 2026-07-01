import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
//import { TUser } from 'src/guards/types.guard'
import { PrismaService, User } from '@drivia/db';
import { SignInDto, TUser } from '@drivia/utils';

@Injectable()
export class AuthService {
  private readonly log = new Logger(AuthService.name);
  private secret: string;

  constructor(
    private config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.secret = this.config.getOrThrow<string>('JWT_SECRET');
  }

  async signIn(
    data: SignInDto,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const { password, ...rest } = user;

    const isMatch = await bcrypt.compare(data.password, password);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = await this.generateJwt({
      id: rest.id,
      email: rest.email,
      phoneNumber: rest.phoneNumber,
    });

    console.log(token);

    return {
      user: rest,
      token,
    };
  }

  async generateJwt(payload: TUser): Promise<string> {
    if (!this.secret) {
      throw new NotFoundException('JWT secret missing');
    }

    return new Promise((resolve, reject) => {
      Jwt.sign(payload, this.secret, (err, token) => {
        if (err) return reject(err);
        resolve(token as string);
      });
    });
  }

  async getProfile(
    userId: string,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const response = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    if (!response) {
      throw new NotFoundException('User not found');
    }

    const user = response as User;

    const token = await this.generateJwt({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    return {
      user: user,
      token,
    };
  }
}
