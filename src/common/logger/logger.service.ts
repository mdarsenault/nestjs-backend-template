import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(logger: winston.Logger) {
    this.logger = logger;
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string, trace?: string): void {
    this.logger.error(message, { trace });
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  // For child logger with service name
  child(context: string): LoggerService {
    return new LoggerService(this.logger.child({ context }));
  }
}
