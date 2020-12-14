import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailiabilityService from '@modules/appointments/services/ListProviderMonthAvailiabilityService';

export default class ProviderMonthAvailabilityCrontroller {

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.params.provider_id;
        const { month, year } = request.body;

        const listProviderMonthAvailiability = container.resolve(ListProviderMonthAvailiabilityService);

        const availability = await listProviderMonthAvailiability.execute({
            provider_id,
            month,
            year,
        });

        return response.json(availability);
    }
}
