// src/factory/ConfigGeneratorFactory.ts
import { IGenerator, LinphoneGenerator } from ".";

// src/config/GeneratorTypes.ts
export const GENERATOR_TYPES = {
  LINPHONE: "linphone",
} as const;

export type GeneratorType =
  (typeof GENERATOR_TYPES)[keyof typeof GENERATOR_TYPES];

export class GeneratorFactory {
  // Map of available generators
  private static generators: Record<GeneratorType, new () => IGenerator> = {
    [GENERATOR_TYPES.LINPHONE]: LinphoneGenerator,
  };

  public static getGenerator(generatorType?: string): IGenerator {
    if (generatorType && generatorType in this.generators) {
      return new this.generators[generatorType as GeneratorType]();
    }
    console.warn(
      `Unknown generator type "${generatorType}", defaulting to "${GENERATOR_TYPES.LINPHONE}".`,
    );
    return new LinphoneGenerator();
  }

  public static getAvailableGenerators(): string[] {
    return Object.keys(this.generators);
  }
}
