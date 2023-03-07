import { UnitData, UnitSystem } from '../types/unit';

export namespace UnitById {
  export interface Params {
    unitId: number;
  }
  export type Response = UnitData;
}

export namespace CreateUnit {
  export interface Body {
    locationId: number;
    number: string;
    size: number;
    unitSystem: UnitSystem;
  }
  export type Response = UnitData;
}
