import dotenv from 'dotenv';
import request from 'supertest';

dotenv.config();
describe('Test Integration Status API', () => {
  it('should return 200 when making a GET request', async () => {
    const randomApiKey = process.env.RANDOM_NUMBER || '';
    const url_app = process.env.APP_URL || '';
    const response = await request(url_app)
      .get('/')
      .set('x-api-key', randomApiKey);
    expect(response.status).toBe(200);
    expect(response.status).toBe(200);
  });
});
