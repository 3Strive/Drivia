import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  getHello(): string {
    return 'Hello World!';
  }
}
