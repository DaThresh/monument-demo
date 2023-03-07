import { ParanoidData } from './common';
import { LocationData } from './location';

export type UnitSystem = 'sqft' | 'meters';

export type UnitCreationData = Omit<UnitData, keyof ParanoidData>;
export type UnitData = {
  locationId: number;
  number: string;
  size: number;
  unitSystem: UnitSystem;
} & ParanoidData &
  UnitAssociations;

type UnitAssociations = {
  location?: LocationData;
};
