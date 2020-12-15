import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsCrontroller {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;
        // eslint-disable-next-line camelcase
        const { day, month, year } = request.body;

        const listAppointment = container.resolve(ListProviderAppointmentsService);

        const appointments = await listAppointment.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.json(appointments);
    }
}
