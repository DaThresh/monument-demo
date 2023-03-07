import { Unit } from '../models';
import { NotFoundError } from '../utilities/errors';
import { Controller } from './controller';
import { createUnitSchema, unitByIdSchema } from './schemas/unit';

const unitController = new Controller();

unitController.createEndpoint({
  method: 'GET',
  route: '/:unitId/leases',
  successCode: 200,
  inputSchemas: { ...Controller.defaultInputSchema, params: unitByIdSchema },
  callback: async ({ params }) =>
    await Unit.findByPk(params.unitId, { rejectOnEmpty: new NotFoundError('Unit not found') }),
});

unitController.createEndpoint({
  method: 'POST',
  route: '/',
  successCode: 201,
  inputSchemas: { ...Controller.defaultInputSchema, body: createUnitSchema },
  callback: async ({ body }) => await Unit.create(body),
});

export { unitController };
