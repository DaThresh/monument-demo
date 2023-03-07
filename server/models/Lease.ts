import { LeaseCreationData, LeaseData } from '@shared/types/lease';
import { BelongsToGetAssociationMixin, DataTypes, Sequelize } from 'sequelize';
import { Paranoid } from './paranoid';
import { Tenant } from './Tenant';
import { Unit } from './Unit';
import { foreignKeyModelAttributes } from './utilities';

export class Lease extends Paranoid<LeaseData, LeaseCreationData> implements LeaseData {
  declare tenantId: LeaseData['tenantId'];
  declare unitId: LeaseData['unitId'];
  declare lcd: LeaseData['lcd'];
  declare lxd: LeaseData['lxd'];

  declare tenant?: Tenant;
  declare getTenant: BelongsToGetAssociationMixin<Tenant>;

  declare unit?: Unit;
  declare getUnit: BelongsToGetAssociationMixin<Unit>;

  public static associate = () => {
    this.belongsTo(Tenant);
    this.belongsTo(Unit);
  };

  public static initModel = (sequelize: Sequelize) => {
    this.init(
      {
        ...Paranoid.modelAttributes,
        tenantId: { ...foreignKeyModelAttributes(Tenant) },
        unitId: { ...foreignKeyModelAttributes(Unit) },
        lcd: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        lxd: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        ...Paranoid.initOptions(sequelize),
        modelName: 'lease',
        tableName: 'leases',
      }
    );
  };
}
