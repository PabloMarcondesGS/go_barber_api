import IParseMailTemplateDTO from '../dtos/IParseMailTempleteProviderDTO';

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}
