import { config } from './config';
import * as redis from 'redis';
import { Logger } from '@nestjs/common';

const logger = new Logger('Redis');

const redisClient = redis.createClient({
  socket: {
    host: config.get('redis.host'),
    port: config.get('redis.port'),
  },
  password: config.get('redis.password'),
  legacyMode: true,
});
redisClient.on('error', (err) => {
  logger.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', () => {
  logger.log('Connected to redis successfully');
});
redisClient.on('ready', () => {
  logger.log('Redis is ready');
});

export { redisClient };
