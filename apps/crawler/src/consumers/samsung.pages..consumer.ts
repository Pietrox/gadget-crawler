import { QueueEnum } from '@app/enums';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { LooseObjectInterface } from '@app/interfaces';
import * as getUuid from 'uuid-by-string';
import { Logger } from '@nestjs/common';
import { CrawlerService } from '../crawler.service';
import { ExtProductDto } from '@app/dto/product.dto';

@Processor(QueueEnum.crawlSamsungPages)
export class SamsungPagesConsumer {
  private readonly logger = new Logger(SamsungPagesConsumer.name);
  constructor(private crawlerService: CrawlerService) {}

  @Process()
  async process(job: Job) {
    const start = Date.now();
    const productData: LooseObjectInterface = {};
    try {
      const { page, browser } = await this.crawlerService.getPage();

      productData.productId = getUuid(job.data.url, 5);

      page.on('response', async (response) => {
        if (response.url().includes(job.data.utils.responseUrlFilter[0]) && response.url().includes(job.data.utils.responseUrlFilter[0])) {
          const modelName = await (
            await page.$$(`${job.data.utils.modelSelectorDOM}[class*=${job.data.utils.modelSelector}]`)
          )[0].evaluate((el) => el.innerText);

          const params = page.url().split('/');
          productData.category = params[5];
          productData.model = modelName;
        }

      });
      await page.goto(job.data.url);
      await page.click(`${job.data.utils.promoSelectorDOM}[class*=${job.data.utils.promoSelector}]`);
      await browser.close();
      await this.crawlerService.insertSamsungProduct(productData as ExtProductDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log(`SAMSUNG_PAGE_PRODUCT_${productData.model} processed in ${(Date.now() - start) / 1000}s`);
    }
  }
}
