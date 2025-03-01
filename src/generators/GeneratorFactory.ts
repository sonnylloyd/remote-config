// src/factory/ConfigGeneratorFactory.ts
import { IGenerator } from ".";
import fs from "fs";
import path from "path";

export interface IGeneratorFactory {
  getGenerator(generatorType?: string): IGenerator;
  getAvailableGenerators(): string[];
}

export class GeneratorFactory implements IGeneratorFactory {
  // Map of available generators
  private generators: Record<string, new () => IGenerator> = {};

  constructor() {
    this.loadGenerators();
  }

  public async loadGenerators(): Promise<void> {
    // Determine the correct path dynamically
    const factoryDir = path.dirname(__filename); // Get the directory of this file
    const generatorsPath = path.join(factoryDir, "generators"); // Look for a 'generators' folder next to this file

    if (!fs.existsSync(generatorsPath)) {
      console.warn(`Generator directory not found: ${generatorsPath}`);
      return;
    }

    const files = fs.readdirSync(generatorsPath); // Use only .js after compilation
    for (const file of files) {
      const module = await import(path.join(generatorsPath, file));

      for (const key in module) {
        const GeneratorClass = module[key];
        if (typeof GeneratorClass === "function") {
          const instance = new GeneratorClass();
          if (typeof instance.getName === "function") {
            this.generators[instance.getName()] = GeneratorClass;
          }
        }
      }
    }
  }

  public getGenerator(generatorType?: string): IGenerator {
    if (generatorType && this.generators[generatorType]) {
      return new this.generators[generatorType]();
    }
    console.warn(`Unknown generator type "${generatorType}", defaulting to the first available generator.`);
    return new this.generators[Object.keys(this.generators)[0]]();
  }

  public getAvailableGenerators(): string[] {
    return Object.keys(this.generators);
  }
}
