import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { createGlobalValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Prefix all endpoints with /api
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(createGlobalValidationPipe());

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Enable class serialization globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
