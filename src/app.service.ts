import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const time = Date().toString();
    return {
        message: 'Hello World!',
        time
    };
  }
}
