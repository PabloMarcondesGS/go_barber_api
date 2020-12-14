/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityCrontroller from '../controllers/ProviderMonthAvailabilityCrontroller';
import ProviderDayAvailiabilityCrontroller from '../controllers/ProviderDayAvailiabilityCrontroller';


const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityCrontroller = new ProviderMonthAvailabilityCrontroller();
const providerDayAvailiabilityCrontroller = new ProviderDayAvailiabilityCrontroller();


providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityCrontroller.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailiabilityCrontroller.index);

export default providersRouter;
