import { Application } from "express";
import { Routes } from "./constants";
import { BasicAuthMiddleware } from "./middlewares";

export default function (app: Application): void {
  const { formController, qrCodeController, configController, IndexController } =
    app.locals.container.cradle;

  app.get(Routes.ROOT, IndexController.index.bind(IndexController));

  app.get(
    Routes.FORM,
    BasicAuthMiddleware.authenticate,
    formController.renderForm.bind(formController)
  );
  app.post(
    Routes.SUBMIT_FORM,
    BasicAuthMiddleware.authenticate,
    formController.submitForm.bind(formController)
  );
  app.get(
    Routes.GET_GENERATORS,
    BasicAuthMiddleware.authenticate,
    formController.getSupportedGenerators.bind(formController)
  );
  app.get(
    Routes.FORM_FIELDS,
    BasicAuthMiddleware.authenticate,
    formController.getFormFields.bind(formController)
  );
  app.get(Routes.QR, qrCodeController.generateQRCode.bind(qrCodeController));
  app.get(Routes.CONFIG, configController.getConfig.bind(configController));
}
