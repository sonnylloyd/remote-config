// src/services/FormGeneratorService.ts
import { GeneratorFactory, FormField } from "./../generators";

export class FormGeneratorService {
  static getFormFields(generatorType?: string): FormField[] {
    const generator = GeneratorFactory.getGenerator(generatorType);
    return generator.getFields();
  }
}
