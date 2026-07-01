import { QUEUES, SERVICES, UtilsModule } from '@drivia/utils';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import env from '../config/env';
import { UserController } from './users/user/user.controller';
import { AuthController } from './auth/auth.controller';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.USER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: QUEUES.USER_QUEUE,
          queueOptions: { durable: true },
        },
      },
      {
        name: SERVICES.AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: QUEUES.AUTH_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
    ConfigModule.forRoot({ cache: true, isGlobal: true, load: [env] }),
    UtilsModule,
  ],
  controllers: [UserController, AuthController],
  providers: [],
})
export class AppModule {}
