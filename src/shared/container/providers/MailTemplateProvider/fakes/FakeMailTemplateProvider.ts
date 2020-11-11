import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplatePRovider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail content';
    }
}

export default FakeMailTemplatePRovider;
