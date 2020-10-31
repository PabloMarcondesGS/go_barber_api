import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
class CreateUserService {
    // eslint-disable-next-line no-empty-function
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkoUserExists = await this.usersRepository.findbyEmail(email);

        if (checkoUserExists) {
            throw new AppError('Email address already used', 400);
        }

        const hashedPassWord = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassWord,
        });

        return user;
    }
}

export default CreateUserService;
