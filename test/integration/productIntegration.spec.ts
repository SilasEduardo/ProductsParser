import request from 'supertest';

describe('Test Integration Status API', () => {
  it('should return 200 when making a GET request', async () => {
    const response = await request('http://localhost:3333').get('/');
    expect(response.status).toBe(200);
  });
});
