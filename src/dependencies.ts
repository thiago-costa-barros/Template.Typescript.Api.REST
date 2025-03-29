import { UserRepository } from "./repositories/UserRepository";
import { UserController } from "./controllers/UserController";
import { UserTokenRepository } from "./repositories/AuthRepository";
import { UserTokenController } from "./controllers/AuthController";
import { UserService } from "./services/UserService";
import { UserTokenService } from "./services/AuthService";

// Configuração centralizada de dependências
const userRepository = new UserRepository();
const userTokenRepository = new UserTokenRepository();

// Serviços com dependências injetadas
const userService = new UserService(userRepository);
const userTokenService = new UserTokenService(userTokenRepository, userRepository);

// Controllers com dependências injetadas
const userController = new UserController(userService, userTokenService);
const userTokenController = new UserTokenController(userTokenService);

export const dependencies = {
  repositories: {
    userRepository,
    userTokenRepository
  },
  services: {
    userService,
    userTokenService
  },
  controllers: {
    userController,
    userTokenController
  }
};