import { QueueEnum } from '@app/enums';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { LooseObjectInterface } from '@app/interfaces';
import * as getUuid from 'uuid-by-string';
import { Logger } from '@nestjs/common';
import { CrawlerService } from '../crawler.service';
import { ExtProductDto } from '@app/dto/product.dto';
import { TimeHelper } from '@app/helpers/time.helper';

@Processor(QueueEnum.crawlAsusPages)
export class AsusPagesConsumer {
  private readonly logger = new Logger(AsusPagesConsumer.name);
  constructor(private crawlerService: CrawlerService) {}
  @Process()
  async process(job: Job) {
    const start = Date.now();
    const productData: LooseObjectInterface = {};
    try {
      const { page, browser } = await this.crawlerService.getPage();

      productData.productId = getUuid(job.data.url, 5);

      await page.goto(job.data.url);
      await page.waitForSelector(job.data.utils.cookieAcceptSelector);
      await page.click(job.data.utils.cookieAcceptSelector);

      const topElements = await page.$$(`div[class^=${job.data.utils.techSpecSelector}]`);
      await TimeHelper.delay(100, 1000);
      await Promise.all(
        topElements.map(async (element) => {
          const data = await element.evaluate((el) => (el as HTMLElement).innerText);
          if (data === 'Tech Specs') {
            const params = page.url().split('/');
            productData.category = params[3];
            productData.type = params[4];
            productData.series = params[5];
            productData.model = params[6];
          }
        }),
      );
      const specContainer = await page.$x(`//${job.data.utils.specSelectorDOM}[contains(@class, "${job.data.utils.specSelector}")]`);
      const specDivs = await specContainer[0].$x('div');
      await Promise.all(
        specDivs.map(async (parentDiv) => {
          const h2 = await parentDiv.$x('h2');
          const h2Text = await h2[0].evaluate((el) => (el as HTMLElement).innerText);
          const childDiv = await parentDiv.$x('div');
          productData.specs = {}
          productData.specs[h2Text.toLocaleLowerCase()] = await childDiv[0].evaluate((el) => (el as HTMLElement).innerText);
        }),
      );
      await browser.close();
      await this.crawlerService.insertAsusProduct(productData as ExtProductDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log(`ASUS_PAGE_PRODUCT_${productData.model} processed in ${(Date.now() - start) / 1000}s`);
    }
  }
}
