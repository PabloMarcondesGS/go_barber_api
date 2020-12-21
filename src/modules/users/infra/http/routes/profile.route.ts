import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileCrontroller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', 
                celebrate({ [Segments.BODY]:{
                    name: Joi.string().uuid().required(),
                    email: Joi.string().email().required(),
                    old_password: Joi.string(),
                    password: Joi.string(),
                    password_confirmation: Joi.string().valid(Joi.ref('password')),
                }}), profileCrontroller.show);
profileRouter.put('/', profileCrontroller.update);

export default profileRouter;
