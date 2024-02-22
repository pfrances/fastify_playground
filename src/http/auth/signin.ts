import { type RegisterOptions, type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

async function signin(fastify: FastifyInstance, options: RegisterOptions): Promise<void> {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });
}
export default signin;
