// src/controllers/QRCodeController.ts
import { Request, Response } from "express";
import QRCode from "qrcode";
import { UrlRoute } from "../utils/UrlRoute";
import { Routes } from "../constants";
import { BaseController } from ".";
import { IStorage } from "./../stores";
import { GeneratorFactory } from "./../generators";

export class QRCodeController extends BaseController {
  private storage: IStorage;
  
  constructor(storage: IStorage) {
    super();
    this.storage = storage;
  }

  /**
   * Generates and serves the QR code for the config URL.
   */
  async generateQRCode(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;

      // Retrieve the stored config data from Redis
      const storedData = await this.storage.get(key);

      if (!storedData) {
        res.status(404).json({ error: "Configuration not found" });
        return;
      }

      const { data, generatorType } = JSON.parse(storedData);
      
      const generator = GeneratorFactory.getGenerator(generatorType);

      if (!generator) {
        res.status(500).json({ error: `Generator '${generatorType}' not found` });
        return;
      }

      const instructions = generator.getInstructions();

      // Generate the config URL using the provided key
      const configUrl = UrlRoute.make(
        Routes.CONFIG,
        { key },
        UrlRoute.url(req),
      );

      // Generate QR code as base64
      const qrCode = await QRCode.toDataURL(configUrl);

      // Render the Nunjucks template with QR code
      res.render("qrcode.njk", { configUrl, qrCode, instructions });
    } catch (error) {
      console.error("Error generating QR code:", error);
      res.status(500).send("An error occurred while generating the QR code.");
    }
  }
}
