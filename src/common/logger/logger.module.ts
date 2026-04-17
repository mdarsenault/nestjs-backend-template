import { DynamicModule, Global, Module } from '@nestjs/common';

import { createLogger } from './logger.factory';
import { LoggerService } from './logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    const logger = createLogger();

    const loggerProvider = {
      provide: LoggerService,
      useValue: new LoggerService(logger),
    };

    return {
      module: LoggerModule,
      providers: [loggerProvider],
      exports: [LoggerService],
    };
  }
}
