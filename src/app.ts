import { fastify, type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

export function build(opts = {}): FastifyInstance {
  const app = fastify(opts);
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });

  return app;
}
