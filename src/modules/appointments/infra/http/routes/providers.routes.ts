/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/AppointmetsController';

const providersRouter = Router();
const appointmentsController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', appointmentsController.create);

export default providersRouter;
