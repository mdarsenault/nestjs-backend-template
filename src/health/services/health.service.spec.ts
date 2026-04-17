import { Test, TestingModule } from '@nestjs/testing';

import { LoggerService } from '@/common/logger/logger.service';

import { HealthService } from './health.service';

import { mockLoggerService } from '@/test-utils/mocks/logger.service.mock';

describe('HealthService', () => {
  let service: HealthService;

  let childLogger: any;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    childLogger = mockLoggerService.child('HealthService');

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should return status ok', async () => {
      const result = await service.checkHealth();

      expect(result).toEqual({ status: 'ok' });

      expect(childLogger.info).toHaveBeenCalledWith('Health check successful');
    });
  });
});
