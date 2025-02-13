// src/controllers/QRCodeController.ts
import { Request, Response } from "express";
import QRCode from "qrcode";
import { UrlRoute } from "../utils/UrlRoute";
import { Routes } from "../constants";
import { BaseController } from ".";

export class QRCodeController extends BaseController {
  /**
   * Generates and serves the QR code for the config URL.
   */
  async generateQRCode(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;

      // Generate the config URL using the provided key
      const configUrl = UrlRoute.make(
        Routes.CONFIG,
        { key },
        UrlRoute.url(req),
      );

      // Generate QR code as base64
      const qrCode = await QRCode.toDataURL(configUrl);

      // Render the Nunjucks template with QR code
      res.render("qrcode.njk", { configUrl, qrCode });
    } catch (error) {
      console.error("Error generating QR code:", error);
      res.status(500).send("An error occurred while generating the QR code.");
    }
  }
}
