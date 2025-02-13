import { Request, Response } from "express";
import { BaseController } from ".";
import { IStorage } from "./../stores";

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

      console.log('storedData', storedData);

      if (!storedData) {
        res.status(404).json({ error: "Configuration not found" });
        return;
      }

      // Delete the key from Redis to prevent reuse
      await this.storage.delete(key);

      // Set the headers for the response to trigger file download
      res.setHeader("Content-Disposition", "attachment; filename=config.conf");
      res.setHeader("Content-Type", "text/plain");

      // Send the config content as the response
      res.send(storedData);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve config" });
    }
  }
}
