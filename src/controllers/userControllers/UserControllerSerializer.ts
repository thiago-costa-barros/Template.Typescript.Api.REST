import { User } from '@prisma/client';
import { CreateUserResponseData } from './UserControllerTRA';

export class UserSerializer {
  static serialize(user: User): CreateUserResponseData {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
    };
  }
}