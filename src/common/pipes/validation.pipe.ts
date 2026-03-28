import { ValidationPipe } from '@nestjs/common';

export function createGlobalValidationPipe(): ValidationPipe {
  const baseConfig = {
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  };
  return new ValidationPipe({
    ...baseConfig,
  });
}
