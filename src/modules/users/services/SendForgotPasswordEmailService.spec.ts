import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeusersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPassWordEmail from './SendForgotPasswordEmailService';

describe('SendForgotPassWordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUsersRepository = new FakeusersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPassWordEmail = new SendForgotPassWordEmail(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123',
        });

        await sendForgotPassWordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should be able to recover the password using the email', async () => {
        const fakeUsersRepository = new FakeusersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendForgotPassWordEmail = new SendForgotPassWordEmail(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await expect(
            sendForgotPassWordEmail.execute({
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
