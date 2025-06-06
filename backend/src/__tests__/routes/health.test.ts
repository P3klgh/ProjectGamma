import request from 'supertest';
import app from '../../index';

describe('Health Routes', () => {
  describe('GET /api/v1/health', () => {
    it('should return health status successfully', async () => {
      const response = await request(app)
        .get('/api/v1/health')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('uptime');
      expect(response.body.data).toHaveProperty('message', 'OK');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('environment');
      expect(response.body.data).toHaveProperty('version', '1.0.0');
    });

    it('should return valid timestamp format', async () => {
      const response = await request(app)
        .get('/api/v1/health')
        .expect(200);

      const timestamp = response.body.data.timestamp;
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });

    it('should return numeric uptime', async () => {
      const response = await request(app)
        .get('/api/v1/health')
        .expect(200);

      expect(typeof response.body.data.uptime).toBe('number');
      expect(response.body.data.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should include correct content-type header', async () => {
      await request(app)
        .get('/api/v1/health')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
}); 