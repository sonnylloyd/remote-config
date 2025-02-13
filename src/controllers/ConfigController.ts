import { Request, Response } from "express";
import { BaseController } from ".";
import { IStorage } from "./../stores";
import { GeneratorFactory } from "./../generators";

export class ConfigController extends BaseController {
  private storage: IStorage;

  constructor(storage: IStorage) {
    super();
    this.storage = storage;
  }

  async getConfig(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;

      // Retrieve the stored config data from Redis
      const storedData = await this.storage.get(key);

      if (!storedData) {
        res.status(404).json({ error: "Configuration not found" });
        return;
      }

      // Delete the key from Redis to prevent reuse
      //await this.storage.delete(key);

      const { data, generatorType } = JSON.parse(storedData);

      const generator = GeneratorFactory.getGenerator(generatorType);

      if (!generator) {
        res.status(500).json({ error: `Generator '${generatorType}' not found` });
        return;
      }

      // Generate configuration
      const config = generator.generate(
        data,
      );
  
      // Set headers based on the generator
      const headers = generator.getHeaders();

      for (const [key, value] of Object.entries(headers)) {
        res.setHeader(key, value);
      }
  
      res.send(config);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve config" });
    }
  }
}
