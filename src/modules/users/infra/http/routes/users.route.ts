import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';


import UsersCrontroller from '../controllers/UsersController';
import UsersAvatarCrontroller from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersCrontroller = new UsersCrontroller();
const userAvatarController = new UsersAvatarCrontroller();

usersRouter.post('/', 
            celebrate({ [Segments.BODY]:{
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            }}), usersCrontroller.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
