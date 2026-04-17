import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { createTestApp } from '../test-utils/create-test-app';

const API_PREFIX = '/api';

describe('Health (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /health', () => {
    it('should return status ok', async () => {
      const response = await request(app.getHttpServer()).get(
        `${API_PREFIX}/health`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });

    it('should return 404 for unknown nested route', async () => {
      const response = await request(app.getHttpServer()).get(
        `${API_PREFIX}/health/unknown`,
      );

      expect(response.status).toBe(404);
    });
  });
});
