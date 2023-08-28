import request from 'supertest';

describe('Test Integration execute Cron', () => {
  it('should return 200 when making a GET request', async () => {
    const response = await request('http://localhost:3333').get('/cron');
    expect(response.status).toBe(200);
  });
});
