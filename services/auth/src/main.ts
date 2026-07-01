import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../../packages/db/.env') }); // ← explicit path

import { QUEUES } from '@drivia/utils';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: QUEUES.AUTH_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );
  await app.listen();
}
bootstrap();
