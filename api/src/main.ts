import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';

// Custom Packages
import { AppModule } from './app.module';
import { config } from './shared/configs/config';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Security
  app.use(cookieParser(config.get<string>('cookie.secret')));
  //app.use(csurf({ cookie: true }));
  app.use(helmet());

  app.enableCors({
    origin: config.get('websiteUrl'),
    credentials: true,
  });

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
