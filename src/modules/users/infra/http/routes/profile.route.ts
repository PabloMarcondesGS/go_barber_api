import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileCrontroller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileCrontroller.update);

export default profileRouter;
