import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(private readonly logger: Logger) {}

  child(context: string): LoggerService {
    return new LoggerService(this.logger.child({ context }));
  }

  log(message: unknown, context?: string): void {
    this.logger.info(String(message), { context });
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.logger.error(String(message), { trace, context });
  }

  warn(message: unknown, context?: string): void {
    this.logger.warn(String(message), { context });
  }

  debug(message: unknown, context?: string): void {
    this.logger.debug(String(message), { context });
  }

  verbose(message: unknown, context?: string): void {
    this.logger.verbose(String(message), { context });
  }
}
