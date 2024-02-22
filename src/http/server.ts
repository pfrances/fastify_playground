import Fastify, { type FastifyInstance } from 'fastify';
import { type Server, type IncomingMessage, type ServerResponse } from 'http';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import signin from './auth/signin';

interface ServerConfig {
  port: number;
  host?: string;
  logger?: boolean;
}

class HttpServer {
  private server: FastifyInstance<Server, IncomingMessage, ServerResponse> | null = null;
  private readonly config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
  }

  public listen(): void {
    if (this.server === null) throw new Error('Server is not built');

    this.server.listen({ host: this.config.host, port: this.config.port }, (err, address) => {
      if (err !== null) {
        this.server?.log.error(err);
        process.exit(1);
      }
    });
  }

  public async close(): Promise<void> {
    if (this.server === null) return;
    await this.server.close();
  }

  public async build(): Promise<void> {
    if (this.server !== null) return;
    try {
      const env = (process.env.NODE_ENV ?? 'development') as 'development' | 'production' | 'test';
      const envToLogger = {
        development: {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        },
        production: true,
        test: false,
      };
      const server = Fastify({ logger: envToLogger[env] });
      await server.register(swagger);

      const swaggerUIOptions = {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
          info: {
            title: 'fastify-api',
            description: 'API documentation',
            version: '0.1.0',
          },
          host: `localhost:${this.config.port}`,
          schemes: ['http'],
          consumes: ['application/json'],
          produces: ['application/json'],
        },
      };
      await server.register(swaggerUI, swaggerUIOptions);

      await server.register(signin, { prefix: '/auth' });
      this.server = server;
    } catch (error) {
      console.error('Error during server build', error);
      process.exit(1);
    }
  }
}

export default HttpServer;
