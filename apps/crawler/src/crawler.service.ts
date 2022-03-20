import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlerService {
  getHealth(): boolean {
    return true;
  }
}
