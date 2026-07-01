import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DBModule } from '@drivia/db';
import { UtilsModule } from '@drivia/utils';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DBModule, UtilsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
