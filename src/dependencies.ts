import { UserRepository } from './repositories/userRepositories/UserRepository';
import { UserController } from './controllers/userControllers/UserController';
import { ExternalWebhookReceiverRepository } from './repositories/externalWebhookReceiverRepositories/ExternalWebhookReceiverRepository';
import { ExternalWebhookReceiverController } from './controllers/externalWebhookReceiverControllers/ExternalWebhookReceiverController';

// Instancia o repositório (se necessário para outros usos)
const userRepository = new UserRepository();
const externalWebhookReceiverRepository = new ExternalWebhookReceiverRepository()

// Instancia o controller
const userController = new UserController();
const externalWebhookReceiverController = new ExternalWebhookReceiverController();

export const dependencies = {
  userRepository,
  userController,
  externalWebhookReceiverRepository,
  externalWebhookReceiverController
};