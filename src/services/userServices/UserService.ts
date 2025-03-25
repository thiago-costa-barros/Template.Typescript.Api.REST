import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/userRepositories/UserRepository';
import { CreateUserDTO } from 'src/controllers/userControllers/UserControllerDTO';
import bcrypt from 'bcryptjs';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async serviceCreateUser(createUserDTO: CreateUserDTO): Promise<User> {
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

    // Cria o usuário no banco de dados
    const user = await this.userRepository.createUser({
      ...createUserDTO,
      password: hashedPassword,
    });

    return user;
  }

  async serviceGetUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async serviceGetUserById(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async serviceGetUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.getUserByUsername(username);
  }
}