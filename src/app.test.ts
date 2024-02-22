import { type FastifyInstance } from 'fastify';
import { build } from '@src/app';

describe('GET /', () => {
  let app: FastifyInstance;
  beforeAll(() => {
    app = build();
  });

  it('should return 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
