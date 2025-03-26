import { UserRepository } from "./repositories/UserRepository";
import { UserController } from "./controllers/UserController";
import { ExternalWebhookReceiverRepository } from "./repositories/ExternalWebhookReceiverRepository";
import { ExternalWebhookReceiverController } from "./controllers/ExternalWebhookReceiverController";

// Instancia o repositório (se necessário para outros usos)
const userRepository = new UserRepository();
const externalWebhookReceiverRepository =
  new ExternalWebhookReceiverRepository();

// Instancia o controller
const userController = new UserController();
const externalWebhookReceiverController =
  new ExternalWebhookReceiverController();

export const dependencies = {
  userRepository,
  userController,
  externalWebhookReceiverRepository,
  externalWebhookReceiverController,
};
