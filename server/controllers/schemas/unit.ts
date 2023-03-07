import { CreateUnit, UnitById } from '@shared/interfaces/units';
import { UnitSystem } from '@shared/types/unit';
import { number, object, ObjectSchema, string } from 'yup';

export const unitByIdSchema: ObjectSchema<UnitById.Params> = object({
  unitId: number().required(),
});

export const createUnitSchema: ObjectSchema<CreateUnit.Body> = object({
  locationId: number().positive().required(),
  number: string().required(),
  size: number().positive().required(),
  unitSystem: string().oneOf<UnitSystem>(['sqft', 'meters']).required(),
});
