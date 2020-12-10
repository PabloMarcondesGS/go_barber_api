import { getRepository, Repository, Not } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

import User from '../entities/User';

// Função da rota e apenas receber a requisicao, chamar outro arquivo e devolver a resposta
// @EntityRepository(Appointment)
class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findbyId(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findbyEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];
        
        if (except_user_id) {
            users = await this.ormRepository.findOne({
                where: { 
                    id: Not(except_user_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
    }

    public async create(userData: ICreateUserDto): Promise<User> {
        const appointment = this.ormRepository.create(userData);

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
