import { User } from '@prisma/client';
import { CreateUserDTO } from '../../controllers/userControllers/UserControllerDTO';

export interface ICreateUserRepository {
  createUser(userData: CreateUserDTO): Promise<User>;
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
  getUserById(userId: number): Promise<User | null>;
}