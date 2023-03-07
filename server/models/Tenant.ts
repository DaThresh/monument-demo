import { TenantCreationData, TenantData } from '@shared/types/tenant';
import { DataTypes, HasManyGetAssociationsMixin, Sequelize } from 'sequelize';
import { Lease } from './Lease';
import { Paranoid } from './paranoid';

export class Tenant extends Paranoid<TenantData, TenantCreationData> implements TenantData {
  declare name: TenantData['name'];

  declare leases?: Lease[];
  declare getLeases: HasManyGetAssociationsMixin<Lease>;

  public static associate = () => {
    this.hasMany(Lease);
  };

  public static initModel = (sequelize: Sequelize) => {
    this.init(
      {
        ...Paranoid.modelAttributes,
        name: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
      },
      {
        ...Paranoid.initOptions(sequelize),
        modelName: 'tenant',
        tableName: 'tenants',
      }
    );
  };
}
