import { Injectable } from '@nestjs/common';

@Injectable()
export class DatahubService {
  getHello(): string {
    return 'Hello World!';
  }
}
