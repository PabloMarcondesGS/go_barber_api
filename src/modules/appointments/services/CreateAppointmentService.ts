import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
// import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
// import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}
@injectable()
class CreateAppointmentService {
    // eslint-disable-next-line no-empty-function
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
        user_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is alread booked.', 400);
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
