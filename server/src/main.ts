// import 'dotenv/config';

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Transport } from '@nestjs/microservices';
// import { Logger } from '@nestjs/common';
// import { join } from 'path';

// import { ValidationPipe } from './shared/validation.pipe';
// import { getDbConnectionOptions, runDbMigrations } from '@shared/utils';
// const port = process.env.PORT;

// const microserviceOptions = {
//   transport: Transport.GRPC,
//   options: {
//     package: 'app',
//     protoPath: join(__dirname, '../src/app.proto'),
//   },
// };

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(
//     AppModule.forRoot(await getDbConnectionOptions(process.env.NODE_ENV)),
//     microserviceOptions,
//   );

//   /**
//    * Apply validation for all inputs globally
//    */
//   app.useGlobalPipes(new ValidationPipe());

//   /**
//    * Run DB migrations
//    */
//   await runDbMigrations();

//   Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
// }

// bootstrap();

import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './shared/validation.pipe';
import { getDbConnectionOptions, runDbMigrations } from '@shared/utils';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.forRoot(await getDbConnectionOptions(process.env.NODE_ENV)),
    {
      // logger: Boolean(process.env.ENABLELOGGING),
      logger: console,
    },
  );

  /**
   * Helmet can help protect your app from some well-known
   * web vulnerabilities by setting HTTP headers appropriately.
   * Generally, Helmet is just a collection of 12 smaller
   * middleware functions that set security-related HTTP headers
   *
   * https://github.com/helmetjs/helmet#how-it-works
   */
  app.use(helmet());

  app.enableCors();

  // /**
  //  * we need this because "cookie" is true in csrfProtection
  //  */
  // app.use(cookieParser());

  // app.use(csurf({ cookie: true }));

  /**
   * To protect your applications from brute-force attacks
   */
  // app.use(
  //   new rateLimit({
  //     windowMs: 15 * 60 * 1000,
  //     max: 100,
  //   }),
  // );

  /**
   * Apply validation for all inputs globally
   */
  app.useGlobalPipes(
    new ValidationPipe(),
  );

  /**
   * Run DB migrations
   */
  await runDbMigrations();

  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
