import { DynamicModule, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseUsersService } from './firebase-user.service';

@Module({
  providers: [FirebaseUsersService],
  exports: [FirebaseUsersService],
})
export class FirebaseModule {
  static register(
    credential = admin.credential.applicationDefault(),
  ): DynamicModule {
    admin.initializeApp({
      credential,
    });
    return {
      module: FirebaseModule,
    };
  }

  static registerServiceAccount(
    serviceAccount: string | admin.ServiceAccount,
  ): DynamicModule {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return {
      module: FirebaseModule,
    };
  }
}
