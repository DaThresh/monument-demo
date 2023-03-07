import { UnitCreationData, UnitData } from '@shared/types/unit';
import { BelongsToGetAssociationMixin, DataTypes, Sequelize } from 'sequelize';
import { Location } from './Location';
import { Paranoid } from './paranoid';
import { foreignKeyModelAttributes } from './utilities';

export class Unit extends Paranoid<UnitData, UnitCreationData> implements UnitData {
  declare locationId: UnitData['locationId'];
  declare number: UnitData['number'];
  declare size: UnitData['size'];
  declare unitSystem: UnitData['unitSystem'];

  declare getLocation: BelongsToGetAssociationMixin<Location>;
  declare location?: Location;

  public static association = () => {
    this.belongsTo(Location);
  };

  public static initModel = (sequelize: Sequelize) => {
    this.init(
      {
        ...Paranoid.modelAttributes,
        locationId: { ...foreignKeyModelAttributes(Location) },
        number: {
          type: DataTypes.STRING(24),
          allowNull: false,
        },
        size: {
          type: DataTypes.DECIMAL(9, 2),
          allowNull: false,
        },
        unitSystem: {
          type: DataTypes.ENUM('sqft', 'meters'),
          allowNull: false,
        },
      },
      {
        ...Paranoid.initOptions(sequelize),
        modelName: 'unit',
        tableName: 'units',
      }
    );
  };
}
