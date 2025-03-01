// src/container.ts
import { createContainer, asClass, asValue } from "awilix";
import { RedisStorage } from "./stores";
import {
  ConfigController,
  QRCodeController,
  FormController,
  IndexController
} from "./controllers";
import { GeneratorFactory } from './generators';
import { BasicAuthMiddleware } from "./middlewares";
import { FormGeneratorService } from './services';
import { config } from "./config";
import { Application } from "express";

export class Injection {
  private container;
  constructor(app: Application) {
    this.container = createContainer({
      injectionMode: 'CLASSIC',
    });

    this.container.register({
      generatorFactory: asClass(GeneratorFactory).singleton(),
      formGeneratorService: asClass(FormGeneratorService).singleton(),
      storage: asClass(RedisStorage).singleton(),
      IndexController: asClass(IndexController).singleton(),
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
