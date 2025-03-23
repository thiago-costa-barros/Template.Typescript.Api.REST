
import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/userRepositories/UserRepository';
import { CreateUserDTO } from 'src/controllers/userControllers/UserControllerDTO';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    // Lógica de negócio (ex: criptografar senha)
    const hashedPassword = await this.hashPassword(createUserDTO.password);

    // Cria o usuário no banco de dados
    const user = await this.userRepository.createUser({
      ...createUserDTO,
      password: hashedPassword,
    });

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    // Simulação de criptografia
    return `hashed_${password}`;
  }
}