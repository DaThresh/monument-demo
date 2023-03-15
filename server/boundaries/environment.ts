import dotenv from 'dotenv';
import { MissingEnvironmentError } from '../utilities/errors';
import { logger } from './logger';
dotenv.config();

const environments = ['production', 'stage', 'qa', 'development', 'sandbox', 'test'] as const;
export type Environment = (typeof environments)[number];

export const whichEnv = (): Environment => {
  const validEnvironments: string[] = [...environments];
  if (validEnvironments.includes(process.env.NODE_ENV ?? '')) {
    return process.env.NODE_ENV as Environment;
  } else {
    throw new MissingEnvironmentError('Missing NODE_ENV environment variable');
  }
};

export const environment = {
  port: +(process.env.PORT ?? 5050),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  database: {
    host: process.env.DATABASE_HOST ?? 'DB_HOST',
    name: process.env.DATABASE_NAME ?? 'DB_NAME',
    username: process.env.DATABASE_USERNAME ?? 'DB_USERNAME',
    password: process.env.DATABASE_PASSWORD ?? 'DB_PASSWORD',
    port: +(process.env.DATABASE_PORT ?? 3306),
    socketPath: process.env.DATABASE_SOCKET_PATH,
  },
};

logger.info(`Operating in ${whichEnv()} environment`);
