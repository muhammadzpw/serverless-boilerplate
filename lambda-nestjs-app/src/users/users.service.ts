import { User } from './models/users.model';

export class UsersService {
  async getUsers(): Promise<Array<User>> {
    return [{ id: '12312', name: 'hehe', email: 'hehe@mail.com' }];
  }
}
