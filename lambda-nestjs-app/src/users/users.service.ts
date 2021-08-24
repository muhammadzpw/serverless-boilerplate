import { User } from './models/users.model';
import { IUsersService } from './users-service.interface';

export class UsersService implements IUsersService {
  async findUserByEmail(email: string): Promise<User> {
    console.log(email);
    return { id: '12312', name: 'hehe', email: 'hehe@mail.com' };
  }

  async listUsers(): Promise<Array<User>> {
    return [{ id: '12312', name: 'hehe', email: 'hehe@mail.com' }];
  }
}
