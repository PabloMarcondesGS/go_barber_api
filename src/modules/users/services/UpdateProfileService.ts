/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    passsword?: string;
}
@injectable()
class UpdateProfile {
    // eslint-disable-next-line no-empty-function
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,

        @inject('HashProvider') private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        passsword,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findbyId(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdateEmail = await this.usersRepository.findbyEmail(
            email,
        );

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
            throw new AppError('E-mail already in use');
        }

        user.name = name;
        user.email = email;

        if (passsword && !old_password) {
            throw new AppError(
                'You need inform the old password to set a new password.',
            );
        }

        if (passsword && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }
        }

        if (passsword) {
            user.password = await this.hashProvider.generateHash(passsword);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateProfile;
