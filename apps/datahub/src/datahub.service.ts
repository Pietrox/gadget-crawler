import { Injectable } from '@nestjs/common';

@Injectable()
export class DatahubService {
  getHealth(): boolean {
    return true;
  }
}
