import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailiabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailiabilityCrontroller {

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.params.provider_id;
        const { day, month, year } = request.body;

        const listProviderDayAvailiability = container.resolve(ListProviderDayAvailiabilityService);

        const availability = await listProviderDayAvailiability.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.json(availability);
    }
}
