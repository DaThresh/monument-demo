import { DateString, ParanoidData } from './common';
import { TenantData } from './tenant';
import { UnitData } from './unit';

export type LeaseCreationData = Omit<LeaseData, keyof ParanoidData>;
export type LeaseData = {
  tenantId: number;
  unitId: number;
  lcd: DateString;
  lxd: DateString;
} & ParanoidData &
  LeaseAssociations;

type LeaseAssociations = {
  tenant?: TenantData;
  unit?: UnitData;
};
