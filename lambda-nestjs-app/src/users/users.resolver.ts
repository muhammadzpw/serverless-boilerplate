import { Query, Resolver } from '@nestjs/graphql';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<Array<User>> {
    return this.usersService.getUsers();
  }
}
