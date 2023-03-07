import { LocationCreationData, LocationData } from '@shared/types/location';
import { DataTypes, HasManyGetAssociationsMixin, Sequelize } from 'sequelize';
import { Paranoid } from './paranoid';
import { Unit } from './Unit';

export class Location extends Paranoid<LocationData, LocationCreationData> implements LocationData {
  declare name: LocationData['name'];
  declare address: LocationData['address'];
  declare city: LocationData['city'];
  declare state: LocationData['state'];
  declare postalCode: LocationData['postalCode'];

  declare units?: Unit[];
  declare getUnits: HasManyGetAssociationsMixin<Unit>;

  public static associate = () => {
    this.hasMany(Unit);
  };

  public static initModel = (sequelize: Sequelize) => {
    this.init(
      {
        ...Paranoid.modelAttributes,
        name: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        state: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        postalCode: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
      },
      {
        ...Paranoid.initOptions(sequelize),
        modelName: 'location',
        tableName: 'locations',
      }
    );
  };
}
