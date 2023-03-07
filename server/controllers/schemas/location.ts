import { CreateLocation, LocationById } from '@shared/interfaces/locations';
import { object, ObjectSchema, string } from 'yup';

export const createLocationSchema: ObjectSchema<CreateLocation.Body> = object({
  name: string().required(),
  address: string().required(),
  city: string().required(),
  state: string().required(),
  postalCode: string().required(),
});

export const locationByIdSchema: ObjectSchema<LocationById.Params> = object({
  locationId: string().required(),
});
