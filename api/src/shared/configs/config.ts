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
    nodeEnv: string;
  };
  websiteUrl: string;
  jwt: {
    accessSecret: string;
    accessTokenExpirationTime: number;
    refreshSecret: string;
    refreshTokenExpirationTime: number;
  };
  cookie: {
    secret: string;
  };
  redis: {
    host: string;
    port: number;
    password: string;
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
      nodeEnv: {
        default: 'dev',
        env: 'NODE_ENV',
        format: String,
      },
    },
    websiteUrl: {
      default: 'http://localhost:3000',
      format: String,
      env: 'WEBSITE_URL',
    },
    cookie: {
      secret: {
        default:
          'very_very_very_very_very_very_very_very_very_very_very_very_long_secret_key',
        format: String,
        env: 'COOKIE_SECRET',
      },
    },
    jwt: {
      accessSecret: {
        default:
          'very_very_very_very_very_very_very_very_very_very_very_very_long_secret_key',
        format: String,
        env: 'JWT_ACCESS_SECRET',
      },
      accessTokenExpirationTime: {
        default: 3600,
        format: Number,
        env: 'JWT_ACCES_TOKEN_EXPIRATION_TIME',
      },
      refreshSecret: {
        default:
          'very_very_very_very_very_very_very_very_very_very_very_very_long_secret_key',
        format: String,
        env: 'JWT_REFRESH_SECRET',
      },
      refreshTokenExpirationTime: {
        default: 86400,
        format: Number,
        env: 'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      },
    },
    redis: {
      host: {
        default: 'localhost',
        format: String,
        env: 'REDIS_HOST',
      },
      port: {
        default: 6379,
        format: Number,
        env: 'REDIS_PORT',
      },
      password: {
        default: '',
        format: String,
        env: 'REDIS_PASSWORD',
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
