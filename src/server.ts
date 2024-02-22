import { build } from '@src/app';

const server = build({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
    },
  },
});

server.listen({ port: 3000 }, (err, address) => {
  if (err !== null) {
    server.log.error(err);
    process.exit(1);
  }
});
