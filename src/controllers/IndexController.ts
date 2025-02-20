// src/controllers/QRCodeController.ts
import { Request, Response } from "express";
import { BaseController } from ".";

export class IndexController extends BaseController {

  /**
   * Generates and serves the QR code for the config URL.
   */
  async index(req: Request, res: Response): Promise<void> {
      // Render the Nunjucks template with QR code
      res.render("index.njk");
      return;
  }
}
