import { LoggerService } from '@/common/logger/logger.service';

export const mockLoggerService = {
  child: jest.fn().mockReturnValue({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  }),
} as Partial<LoggerService>;

/*

To use:

import { LoggerService } from '@/common/logger/logger.service';
import {
  mockLoggerService,
} from '@/test-utils/mocks/logger.service.mock';

beforeEach(async () => {
  jest.clearAllMocks();

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DevicesService,
      {
        provide: LoggerService,
        useValue: mockLoggerService,
      },
      {
        provide: DevicesRepository,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
        },
      },
    ],
  }).compile();

  childLogger = mockLoggerService.child('DevicesService');

  service = module.get(DevicesService);
  devicesRepository = module.get(DevicesRepository);
  ...
});

*/
