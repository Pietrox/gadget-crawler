import { Injectable } from '@nestjs/common';


@Injectable()
export class CrawlerService {
  async getHealth(): Promise<boolean> {
    return true;
  }
}
