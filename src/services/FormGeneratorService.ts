import { IGeneratorFactory } from "./../generators";
import { FormField } from "./../generators";

export interface IFormGeneratorService {
  getFormFields(generatorType?: string): FormField[];
}

export class FormGeneratorService implements IFormGeneratorService {
  private generatorFactory: IGeneratorFactory;

  constructor({ generatorFactory }: { generatorFactory: IGeneratorFactory }) {
    this.generatorFactory = generatorFactory;
  }

  getFormFields(generatorType?: string): FormField[] {
    const generator = this.generatorFactory.getGenerator(generatorType);
    return generator.getFields();
  }
}
