import { injectable, inject } from 'tsyringe';

interface IRequest {
    user_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvialibityService {
    // eslint-disable-next-line no-empty-function
    constructor(
    ) {}

    public async execute({ user_id, year, month }: IRequest): Promise<IResponse> {
        return [{
            day: 1,
            available: false
        }]
    }
}

export default ListProviderMonthAvialibityService;
