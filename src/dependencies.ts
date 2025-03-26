import { UserRepository } from "./repositories/UserRepository";
import { UserController } from "./controllers/UserController";
import { ExternalWebhookReceiverRepository } from "./repositories/ExternalWebhookReceiverRepository";
import { ExternalWebhookReceiverController } from "./controllers/ExternalWebhookReceiverController";
import { UserTokenRepository } from "./repositories/AuthRepository";
import { UserTokenController } from "./controllers/AuthController";

// Instancia o repositório (se necessário para outros usos)
const userRepository = new UserRepository();
const externalWebhookReceiverRepository = new ExternalWebhookReceiverRepository();
const userTokenRepository = new UserTokenRepository()

// Instancia o controller
const userController = new UserController();
const externalWebhookReceiverController = new ExternalWebhookReceiverController();
const userTokenController = new UserTokenController();

export const dependencies = {
  userRepository,
  userController,
  externalWebhookReceiverRepository,
  externalWebhookReceiverController,
  userTokenRepository,
  userTokenController
};
