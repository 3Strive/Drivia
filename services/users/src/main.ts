import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../../packages/db/.env') }); // ← explicit path

import { QUEUES } from '@drivia/utils';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: QUEUES.USER_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );
  await app.listen();
}
bootstrap();
