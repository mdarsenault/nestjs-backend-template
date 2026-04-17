import { Injectable } from '@nestjs/common';

import { LoggerService } from '@/common/logger/logger.service';

@Injectable()
export class HealthService {
  private readonly logger: LoggerService;

  constructor(private readonly loggerService: LoggerService) {
    this.logger = this.loggerService.child('HealthService');
  }

  async checkHealth(): Promise<{ status: string }> {
    this.logger.info('Health check successful');

    return { status: 'ok' };
  }
}
