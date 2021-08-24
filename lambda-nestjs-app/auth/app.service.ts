import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  login(): string {
    return 'Hello World!';
  }
}
