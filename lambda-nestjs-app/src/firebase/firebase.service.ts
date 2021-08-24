import { User } from '../users/models/users.model';
import { IUsersService } from '../users/users-service.interface';
import * as admin from 'firebase-admin';

export class FirebaseUsersService implements IUsersService {
  public readonly firebase = admin.auth();

  async listUsers(): Promise<User[]> {
    let listUser: admin.auth.UserRecord[] = [];
    while (true) {
      const userResults = await this.firebase.listUsers();
      listUser = listUser.concat(userResults.users);
      if (!userResults.pageToken) {
        break;
      }
    }
    return listUser.map((user) => ({
      id: user.uid,
      name: user.displayName,
      email: user.email,
    }));
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.firebase.getUserByEmail(email);
    return {
      id: user.uid,
      name: user.displayName,
      email: user.email,
    };
  }
}
