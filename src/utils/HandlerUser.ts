// src/utils/handlerUser.ts
import { UserService } from '../services/userServices/UserService';
import { UserRepository } from '../repositories/userRepositories/UserRepository';

export async function getHandlerUserId(handlerName: string): Promise<number> {
  const userService = new UserService(new UserRepository());
  const user = await userService.serviceGetOrCreateHandlerUser(handlerName);
  return user.id;
}