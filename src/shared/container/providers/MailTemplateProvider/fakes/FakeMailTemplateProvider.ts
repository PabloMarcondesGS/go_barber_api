import IParseMailTemplateDTO from '../dtos/IParseMailTempleteProviderDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplatePRovider implements IMailTemplateProvider {
    public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTemplatePRovider;
