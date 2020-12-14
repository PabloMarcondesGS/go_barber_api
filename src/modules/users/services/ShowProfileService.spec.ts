import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123',
        });

        const updateUser = await showProfile.execute({
            user_id: user.id,
        });

        expect(updateUser.name).toBe('John Doe');
        expect(updateUser.email).toBe('johndoe@example.com');
    });

    it('should not be able show the profile from  a non-existing user', async () => {
        expect(
            showProfile.execute({
                user_id: 'non-existing-user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
