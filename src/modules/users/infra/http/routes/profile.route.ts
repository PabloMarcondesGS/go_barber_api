import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileCrontroller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileCrontroller.show);
profileRouter.put('/', profileCrontroller.update);

export default profileRouter;
