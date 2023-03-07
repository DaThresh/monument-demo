import { DataTypes, ModelAttributeColumnOptions, ModelStatic } from 'sequelize';
import { Paranoid } from './paranoid';

export const primaryKeyModelAttributes = {
  type: DataTypes.INTEGER.UNSIGNED,
  primaryKey: true,
  autoIncrement: true,
  allowNull: false,
  unique: true,
};

export const foreignKeyModelAttributes = (
  model?: ModelStatic<Paranoid>,
  allowNull = false
): ModelAttributeColumnOptions => ({
  ...(model ? { references: { model } } : {}), // Cannot include key if no model
  type: DataTypes.INTEGER.UNSIGNED,
  allowNull,
});
