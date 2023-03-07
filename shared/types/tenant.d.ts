import { ParanoidData } from './common';
import { UnitData } from './unit';

export type TenantCreationData = Omit<TenantData, keyof ParanoidData>;
export type TenantData = {
  name: string;
} & ParanoidData &
  TenantAssociations;

type TenantAssociations = {
  units?: UnitData[];
};
