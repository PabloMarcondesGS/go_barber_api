import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

// Função da rota e apenas receber a requisicao, chamar outro arquivo e devolver a resposta
@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}

export default AppointmentRepository;
