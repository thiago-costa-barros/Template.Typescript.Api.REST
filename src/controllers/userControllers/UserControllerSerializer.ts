import { User } from '@prisma/client';
import { CreateUserResponse } from './UserControllerTRA';

export class UserSerializer {
  static serialize(user: User): CreateUserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
    };
  }
}