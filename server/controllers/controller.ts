import { Request, RequestHandler, Response, Router } from 'express';
import { IncomingHttpHeaders } from 'http';
import { AnyObject, ObjectSchema } from 'yup';

export class Controller {
  private readonly router: Router;

  // Strict TS Mode requires us explicitly provide these
  public static defaultInputSchema = {
    body: undefined,
    query: undefined,
    params: undefined,
  };

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    return this.router;
  }

  public createEndpoint<Body = void, ResponseBody = void, Params = void, Query = void>(
    config: EndpointConfiguration<Body, ResponseBody, Params, Query>
  ) {
    this.createRoute(config, config.callback);
  }

  public createAuthorizedEndpoint<
    Context,
    Body = void,
    ResponseBody = void,
    Params = void,
    Query = void
  >(config: AuthorizedEndpointConfiguration<Context, Body, ResponseBody, Params, Query>) {
    this.createRoute(config, async (inputContext, request) => {
      const authorizationContext = await config.authorization(request.headers);
      return await config.callback(inputContext, authorizationContext);
    });
  }

  private createRoute<Body, ResponseBody, Params, Query>(
    config: Pick<
      EndpointConfiguration<Body, ResponseBody, Params, Query>,
      'route' | 'method' | 'successCode' | 'inputSchemas'
    >,
    callbackHandler: (
      inputs: InputContext<Body, Query, Params>,
      request: Request<Params, ResponseBody, Body, Query>
    ) => ResponseBody | Promise<ResponseBody>
  ) {
    this.router.use(config.route, (async (
      request: Request<Params, ResponseBody, Body, Query>,
      response: Response<ResponseBody>,
      next
    ) => {
      if (request.method === config.method) {
        const { body, query, params } = request;
        config.inputSchemas.body?.validateSync(body);
        config.inputSchemas.query?.validateSync(query);
        config.inputSchemas.params?.validateSync(params);

        const endpointResponse = await callbackHandler({ body, query, params }, request);
        response.status(config.successCode).send(endpointResponse).end();
      } else {
        next();
      }
    }) as RequestHandler<Params, ResponseBody, Body, Query>);
    // Types are incorrect in ExpressJS
    // https://github.com/express-promise-router/express-promise-router/issues/230
  }
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type InputContext<Body, Query, Params> = {
  body: Body;
  query: Query;
  params: Params;
};

export type EndpointConfiguration<Body, ResponseBody, Params, Query> = {
  method: Method;
  route: string;
  successCode: number;
  callback: (
    inputContext: InputContext<Body, Query, Params>
  ) => ResponseBody | Promise<ResponseBody>;
  inputSchemas: {
    body: Body extends AnyObject ? ObjectSchema<Body> : undefined;
    query: Query extends AnyObject ? ObjectSchema<Query> : undefined;
    params: Params extends AnyObject ? ObjectSchema<Params> : undefined;
  };
};

export type AuthorizedEndpointConfiguration<Context, Body, ResponseBody, Params, Query> = Omit<
  EndpointConfiguration<Body, ResponseBody, Params, Query>,
  'callback'
> & {
  callback: (
    inputContext: InputContext<Body, Query, Params>,
    authorizationContext: Context
  ) => ResponseBody | Promise<ResponseBody>;
  authorization: (headers: IncomingHttpHeaders) => Context | Promise<Context>;
};
