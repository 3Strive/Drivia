import { QUEUES, SERVICES, UtilsModule } from '@drivia/utils';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import env from '../config/env';
import { UserController } from './users/user/user.controller';
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
    ]),
    ConfigModule.forRoot({ cache: true, isGlobal: true, load: [env] }),
    UtilsModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
