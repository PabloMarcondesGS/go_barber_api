import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTempleteProviderDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProviders implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const templetaFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templetaFileContent);

        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProviders;
