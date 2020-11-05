/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    // eslint-disable-next-line no-empty-function
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRespository: IUserTokensRepository,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRespository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.usersRepository.findbyId(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exits');
        }

        user.password = password;

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
