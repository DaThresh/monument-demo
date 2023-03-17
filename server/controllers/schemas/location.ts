import { CreateLocation, DeleteLocation, LocationById } from '@shared/interfaces/locations';
import { number, object, ObjectSchema, string } from 'yup';

export const createLocationSchema: ObjectSchema<CreateLocation.Body> = object({
  name: string().required(),
  address: string().required(),
  city: string().required(),
  state: string().required(),
  postalCode: string().required(),
});

export const locationByIdSchema: ObjectSchema<LocationById.Params> = object({
  locationId: number().required(),
});

export const deleteLocationSchema: ObjectSchema<DeleteLocation.Params> = object({
  locationId: number().required(),
});
