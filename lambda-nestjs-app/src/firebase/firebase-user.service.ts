import { User } from '../users/models/users.model';
import { IUsersService } from '../users/users-service.interface';
import * as admin from 'firebase-admin';

export class FirebaseUsersService implements IUsersService {
  private readonly firebase = admin.auth();

  async listUsers(): Promise<User[]> {
    const userResults = await this.firebase.listUsers();
    return userResults.users.map((user) => ({
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
