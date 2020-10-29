import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersCrontroller from '../controllers/UsersController';
import UsersAvatarCrontroller from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersCrontroller = new UsersCrontroller();
const userAvatarController = new UsersAvatarCrontroller();

usersRouter.post('/', usersCrontroller.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
