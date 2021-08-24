import { Module } from '@nestjs/common';
import { FirebaseUsersService } from '../firebase/firebase-user.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [FirebaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: UsersService,
      useClass: FirebaseUsersService,
    },
  ],
})
export class UsersModule {}
