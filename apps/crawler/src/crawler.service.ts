import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEnum } from '@app/enums';
import { Observable } from 'rxjs';

@Injectable()
export class CrawlerService {
  constructor(@Inject('REDIS_SERVICE') private client: ClientProxy) {}

  getHealth(): boolean {
    return true;
  }

  async insertAsusProduct(data): Promise<Observable<any>> {
    return this.client.emit(CommandEnum.insertAsusProduct, data);
  }
  async insertSamsungProduct(data): Promise<Observable<any>> {
    return this.client.emit(CommandEnum.insertAsusProduct, data);
  }

  async getPage() {
    const puppeteer = require('puppeteer');
    const userAgents = require('user-agents');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setUserAgent(userAgents.toString());
    await page.setViewport({
      width: 1920 + Math.floor(Math.random() * 100),
      height: 1500 + Math.floor(Math.random() * 100),
      deviceScaleFactor: 1,
      hasTouch: false,
      isLandscape: false,
      isMobile: false,
    });
    await page.setJavaScriptEnabled(true);
    await page.setDefaultNavigationTimeout(0);
    return {browser, page};
  }
}
