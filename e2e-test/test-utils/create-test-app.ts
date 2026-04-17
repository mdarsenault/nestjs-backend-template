import { ClassSerializerInterceptor, ModuleMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { createGlobalValidationPipe } from '@/common/pipes/validation.pipe';

import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';

export async function createTestApp(
  ...extraImports: NonNullable<ModuleMetadata['imports']>
): Promise<NestFastifyApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule, ...extraImports],
  }).compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');
  app.useGlobalPipes(createGlobalValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  try {
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    return app;
  } catch (err) {
    try {
      await app.close();
    } catch {
      // swallow secondary close errors
    }
    throw err;
  }
}
