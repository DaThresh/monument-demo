import { Location, Unit } from '../models';
import { NotFoundError } from '../utilities/errors';
import { Controller } from './controller';
import { createLocationSchema, deleteLocationSchema, locationByIdSchema } from './schemas/location';

const locationController = new Controller();

locationController.createEndpoint({
  method: 'GET',
  route: '/:locationId/units',
  successCode: 200,
  inputSchemas: { ...Controller.defaultInputSchema, params: locationByIdSchema },
  callback: async ({ params }) => Unit.findAll({ where: { locationId: params.locationId } }),
});

locationController.createEndpoint({
  method: 'GET',
  route: '/:locationId',
  successCode: 200,
  inputSchemas: { ...Controller.defaultInputSchema, params: locationByIdSchema },
  callback: async ({ params }) =>
    await Location.findByPk(params.locationId, {
      rejectOnEmpty: new NotFoundError('Location not found'),
    }),
});

locationController.createEndpoint({
  method: 'DELETE',
  route: '/:locationId',
  successCode: 200,
  inputSchemas: { ...Controller.defaultInputSchema, params: deleteLocationSchema },
  callback: async ({ params }) => await Location.destroy({ where: { id: params.locationId } }),
});

locationController.createEndpoint({
  method: 'GET',
  route: '/',
  successCode: 200,
  inputSchemas: { ...Controller.defaultInputSchema },
  callback: async () => await Location.findAll({}),
});

locationController.createEndpoint({
  method: 'POST',
  route: '/',
  successCode: 201,
  inputSchemas: { ...Controller.defaultInputSchema, body: createLocationSchema },
  callback: async ({ body }) => await Location.create(body),
});

export { locationController };
