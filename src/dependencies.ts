import { UserRepository } from "./repositories/UserRepository";
import { UserController } from "./controllers/UserController";
import { ExternalWebhookReceiverRepository } from "./repositories/ExternalWebhookReceiverRepository";
import { ExternalWebhookReceiverController } from "./controllers/ExternalWebhookReceiverController";
import { UserTokenRepository } from "./repositories/AuthRepository";
import { UserTokenController } from "./controllers/AuthController";
import { UserService } from "./services/UserService";
import { ExternalWebhookReceiverService } from "./services/ExternalWebhookReceiverService";
import { UserTokenService } from "./services/AuthService";

// Configuração centralizada de dependências
const userRepository = new UserRepository();
const externalWebhookReceiverRepository = new ExternalWebhookReceiverRepository();
const userTokenRepository = new UserTokenRepository();

// Serviços com dependências injetadas
const userService = new UserService(userRepository);
const externalWebhookReceiverService = new ExternalWebhookReceiverService(externalWebhookReceiverRepository);
const userTokenService = new UserTokenService(userTokenRepository, userRepository);

// Controllers com dependências injetadas
const userController = new UserController(userService, userTokenService);
const externalWebhookReceiverController = new ExternalWebhookReceiverController(externalWebhookReceiverService);
const userTokenController = new UserTokenController(userTokenService);

export const dependencies = {
  repositories: {
    userRepository,
    externalWebhookReceiverRepository,
    userTokenRepository
  },
  services: {
    userService,
    externalWebhookReceiverService,
    userTokenService
  },
  controllers: {
    userController,
    externalWebhookReceiverController,
    userTokenController
  }
};