import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UtilsModule } from '@drivia/utils';
import { DBModule } from '@drivia/db';

@Module({
  imports: [DBModule, UtilsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
