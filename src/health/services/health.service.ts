import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  async checkHealth(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
