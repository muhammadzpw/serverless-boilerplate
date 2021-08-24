import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersModule } from './users/users.module';

// TODO: more secure using secret manager
const serviceAccount = require('./creds.json');

@Module({
  imports: [UsersModule, FirebaseModule.registerServiceAccount(serviceAccount)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
