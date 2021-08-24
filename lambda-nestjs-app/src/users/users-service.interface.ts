import { User } from './models/users.model';

export interface IUsersService {
  listUsers: () => Promise<Array<User>>;
  findUserByEmail: (email: string) => Promise<User>;
}
