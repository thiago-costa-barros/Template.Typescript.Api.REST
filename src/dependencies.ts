import { UserRepository } from './repositories/userRepositories/UserRepository';
import { UserController } from './controllers/userControllers/UserController';

// Instancia o repositório (se necessário para outros usos)
const userRepository = new UserRepository();

// Instancia o controller
const userController = new UserController();

export const dependencies = {
  userRepository,
  userController,
};