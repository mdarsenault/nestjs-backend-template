import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { createGlobalValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Prefix all endpoints with /api
  app.setGlobalPrefix('api');

  // Global validation pipe
  // For production, we want to be discrete about errors, and return 404 for all bad requests
  app.useGlobalPipes(createGlobalValidationPipe());

  // Global exception filter
  // We want to be discrete about errors, and return 404 by default for errors unless otherwise specified
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Enable class serialization globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
