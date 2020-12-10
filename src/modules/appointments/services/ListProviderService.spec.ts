import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProfileService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let ListProviders: ListProfileService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        ListProviders = new ListProfileService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John tre',
            email: 'johntre@example.com',
            password: '123',
        });

        const loggedUsers = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password: '123',
        });

        const providers = await ListProviders.execute({
            user_id: loggedUsers.id,
        });

        expect(providers).toEqual([user1, user2]);
    });

});
