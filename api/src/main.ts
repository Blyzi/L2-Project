import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from './shared/configs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as csurf from 'csurf';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Security
  app.use(cookieParser(config.get('cookie.secret')));
  app.use(helmet());
  //app.use(csurf({ cookie: true }));

  if (config.get('api.nodeEnv') === 'prod') {
    app.enableCors({
      origin: config.get('websiteUrl'),
      credentials: true,
    });
  }

  //Validation dto
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  await app.listen(config.get('api.port'));
  logger.log(
    `API running on: ${(await app.getUrl()).replace('[::1]', 'localhost')}`,
  );
}
bootstrap();
