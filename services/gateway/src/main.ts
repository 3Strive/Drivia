import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Env } from 'config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionInterceptor } from 'common/http-error.interceptor';
import { ResponseTransformInterceptor } from 'common/response.interceptor';
import { QUEUES } from '@drivia/utils';

async function bootstrap(): Promise<void> {
  // Fix 1 — CORS was blocking Swagger (empty array blocks everything)
  const origin =
    process.env.NODE_ENV === 'production'
      ? (process.env.ALLOWED_DOMAINS?.split(',') ?? [])
      : '*';

  const app = await NestFactory.create(AppModule, {
    cors: { origin },
  });

  const logger = new Logger();
  const configService = app.get<ConfigService<Env>>(ConfigService);
  const port = configService.get('SERVER_PORT', { infer: true }) || 4000;

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionInterceptor());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  // Fix 2 — Hybrid app so gateway can both serve HTTP and connect to RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: QUEUES.USER_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservices();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Fix 3 — Tell Swagger the correct base URL with /v1 prefix
  const config = new DocumentBuilder()
    .setTitle('Drivia API')
    .setDescription('Drivia Gateway API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () =>
    logger.log(`Server running on port: ${port}`, 'NestApplication'),
  );
}

bootstrap();
