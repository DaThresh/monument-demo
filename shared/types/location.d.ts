import { ParanoidData } from './common';
import { UnitData } from './unit';

export type LocationCreationData = Omit<LocationData, keyof ParanoidData>;
export type LocationData = {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
} & ParanoidData &
  LocationAssociations;

type LocationAssociations = {
  units?: UnitData[];
};
