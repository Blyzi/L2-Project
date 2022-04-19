import { createProfiguration } from '@golevelup/profiguration';
import { Logger } from '@nestjs/common';
interface Config {
  db: {
    port: number;
    ip_address: string;
    name: string;
    user: string;
    password: string;
  };
  api: {
    port: number;
  };
}

const logger = new Logger('Configuration');

export const config = createProfiguration<Config>(
  {
    db: {
      port: {
        default: 6000,
        format: Number,
        env: 'MIKRO_ORM_PORT',
      },
      ip_address: {
        default: '127.0.0.1',
        format: String,
      },
      name: {
        default: 'l2project',
        format: String,
        env: 'MIKRO_ORM_DB_NAME',
      },
      user: {
        default: 'admin',
        format: String,
        env: 'MIKRO_ORM_USER',
      },
      password: {
        default: 'admin',
        format: String,
        env: 'MIKRO_ORM_PASSWORD',
      },
    },
    api: {
      port: {
        default: 3000,
        format: Number,
        env: 'API_PORT',
      },
    },
  },
  {
    strict: true,
    verbose: true,
    logger: (message: string) => {
      logger.log(message);
    },
    configureEnv: () => ({ files: '.env' }),
  },
);
