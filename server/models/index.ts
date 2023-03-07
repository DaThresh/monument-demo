import { Sequelize } from 'sequelize';
import { whichEnv } from '../boundaries/env';
import { Lease } from './Lease';
import { Location } from './Location';
import { Tenant } from './Tenant';
import { Unit } from './Unit';

const initAppDBModels = async (sequelize: Sequelize) => {
  Location.initModel(sequelize);
  Unit.initModel(sequelize);
  Tenant.initModel(sequelize);
  Lease.initModel(sequelize);

  Location.associate();
  Unit.associate();
  Tenant.associate();
  Lease.associate();

  if (whichEnv() === 'sandbox') {
    await Location.sync({});
    await Unit.sync({});
    await Tenant.sync({});
    await Lease.sync({});
  }
};

export { initAppDBModels };
