import handlebars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/IParseMailTempleteProviderDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProviders implements IMailTemplateProvider {
    public async parse({
        template,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProviders;
