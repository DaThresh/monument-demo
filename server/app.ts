import server from './boundaries/api';
import { Database } from './boundaries/database';
import { environment, whichEnv } from './boundaries/environment';
import { logger } from './boundaries/logger';
import { locationController } from './controllers/locations';
import { initMonumentDBModels } from './models';

let MonumentDB: Database;

export const createApp = async () => {
  logger.info('Creating application...');

  MonumentDB = new Database(environment.database);

  await MonumentDB.connect(initMonumentDBModels);

  // Register Controllers here
  server.registerController('/locations', locationController);

  await server.registerStatic(whichEnv() === 'sandbox');
  server.registerApiCatch();
  server.registerErrorHandler();

  return { server };
};

export { MonumentDB };
