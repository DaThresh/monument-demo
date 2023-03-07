import { LocationData } from '../types/location';

export namespace Locations {
  export type Response = LocationData[];
}

export namespace LocationById {
  export interface Params {
    locationId: number;
  }
  export type Response = LocationData;
}

export namespace CreateLocation {
  export interface Body {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  }
  export type Response = LocationData;
}
