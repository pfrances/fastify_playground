// import { config as dotenvConf } from 'dotenv-safe';

// const envConf = dotenvConf({
//   path: '.env',
//   example: '.env.example',
// });

// const config = {
//   port: envConf.required.PORT,
//   host: '127.0.0.1',
//   logger: true,
// };

// console.log(config);

export const toTest = (): string => {
  return 'test';
};

// async function main(): Promise<void> {
//   const server = new HttpServer(config);
//   await server.build();
//   server.listen();
//   ['SIGINT', 'SIGTERM'].forEach(signal => {
//     process.on(signal, async () => {
//       await server.close();
//       console.log(`close application on ${signal}`);
//       process.exit(0);
//     });
//   });
// }
// main();
