// src/container.ts
import { createContainer, asClass, asValue } from "awilix";
import { RedisStorage } from "./stores";
import {
  ConfigController,
  QRCodeController,
  FormController,
} from "./controllers";
import { BasicAuthMiddleware } from "./middlewares";
import { config } from "./config";
import { Application } from "express";

export class Injection {
  private container;
  constructor(app: Application) {
    this.container = createContainer({
      injectionMode: 'CLASSIC',
    });

    this.container.register({
      storage: asClass(RedisStorage).singleton(),
      configController: asClass(ConfigController).singleton(),
      qrCodeController: asClass(QRCodeController).singleton(),
      formController: asClass(FormController).singleton(),
      authMiddleware: asClass(BasicAuthMiddleware).singleton(),
      config: asValue(config),
    });
    app.locals.container = this.container;
  }

  public resolve(containerItem: string) {
    return this.container.resolve(containerItem);
  }
}
