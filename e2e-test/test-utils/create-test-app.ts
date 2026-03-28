import {
  ClassSerializerInterceptor,
  INestApplication,
  ModuleMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { createGlobalValidationPipe } from '@/common/pipes/validation.pipe';

import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';

export async function createTestApp(
  ...extraImports: NonNullable<ModuleMetadata['imports']>
): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule, ...extraImports],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(createGlobalValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  try {
    await app.init();
    return app;
  } catch (err) {
    // ensure no open handles if bootstrap throws
    try {
      await app.close();
    } catch {
      // swallow secondary close errors
    }
    throw err;
  }
}
