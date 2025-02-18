const request = require('supertest');
const app = require('../../app');

describe('API Security Tests', () => {
  test('Should have security headers', async () => {
    const response = await request(app).get('/health');
    
    // Check security headers
    expect(response.headers).toHaveProperty('x-content-type-options', 'nosniff');
    expect(response.headers).toHaveProperty('x-frame-options', 'SAMEORIGIN');
    expect(response.headers).toHaveProperty('x-xss-protection', '1; mode=block');
  });

  test('Should rate limit excessive requests', async () => {
    // Make multiple requests in quick succession
    const requests = Array(10).fill().map(() => 
      request(app).post('/auth/login').send({
        email: 'test@test.com',
        password: 'password123'
      })
    );

    const responses = await Promise.all(requests);
    const tooManyRequests = responses.some(res => res.status === 429);
    expect(tooManyRequests).toBeTruthy();
  });

  test('Should require authentication for protected routes', async () => {
    const response = await request(app).get('/gadgets');
    expect(response.status).toBe(401);
  });

  test('Should reject invalid JWT tokens', async () => {
    const response = await request(app)
      .get('/gadgets')
      .set('Authorization', 'Bearer invalid.token.here');
    
    expect(response.status).toBe(401);
  });

  test('Should validate request body', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'invalid-email',
        password: ''
      });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
