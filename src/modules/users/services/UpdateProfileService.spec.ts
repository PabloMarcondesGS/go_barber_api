import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123',
        });

        const updateUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'jhontre@example.com',
        });

        expect(updateUser.name).toBe('John Trê');
        expect(updateUser.email).toBe('jhontre@example.com');
    });

    it('should not be able to chance to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@test.com',
            password: '123',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able update the profile from  a non-existing user', async () => {
        expect(
            updateProfile.execute({
                user_id: 'non-existing-user',
                name: 'Teste',
                email: 'teste@exemple.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123',
        });

        const updateUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'jhontre@example.com',
            old_password: '123',
            password: '123456',
        });

        expect(updateUser.password).toBe('123456');
    });

    it('should not be able to update the password whithout old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'jhontre@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password whit wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'jhontre@example.com',
                old_password: 'wrong-old-password',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
