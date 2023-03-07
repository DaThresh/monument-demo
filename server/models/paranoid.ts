import { ParanoidData } from '@shared/types/common';
import { DataTypes, InitOptions, Model, ModelAttributes, Sequelize } from 'sequelize';
import { primaryKeyModelAttributes } from './utilities';

export class Paranoid<
    Data extends ParanoidData = ParanoidData,
    CreationData = Record<string, unknown>
  >
  extends Model<Data, Omit<CreationData, 'createdAt' | 'updatedAt'>>
  implements ParanoidData
{
  declare readonly id: ParanoidData['id'];
  declare readonly createdAt: ParanoidData['createdAt'];
  declare readonly updatedAt: ParanoidData['updatedAt'];
  declare readonly deletedAt: ParanoidData['deletedAt'];

  protected static modelAttributes: ModelAttributes<Paranoid, ParanoidData> = {
    id: { ...primaryKeyModelAttributes },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  };

  public static associate = () => {
    // Empty for Child classes
  };

  public static initOptions = (connection: Sequelize): InitOptions => ({
    sequelize: connection,
    timestamps: true,
    paranoid: true,
  });
}
