import { QueueEnum } from '@app/enums';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { LooseObjectInterface } from '@app/interfaces';
import * as getUuid from 'uuid-by-string';
import { Logger } from '@nestjs/common';
import { CrawlerService } from '../crawler.service';
import { ExtProductDto } from '@app/dto/product.dto';

@Processor(QueueEnum.crawlLenovoPages)
export class LenovoPagesConsumer {
  private readonly logger = new Logger(LenovoPagesConsumer.name);
  constructor(private crawlerService: CrawlerService) {}

  @Process()
  async process(job: Job) {
    const start = Date.now();
    const productData: LooseObjectInterface = {};
    try {
      const { page, browser } = await this.crawlerService.getPage();

      productData.productId = getUuid(job.data.url, 5);

      await page.goto(job.data.url);
      productData.productId = productData.model = await (await page.$$(`h2[class*=product_summary]`))[0].evaluate((el) => el.innerText);
      const params = page.url().split('/');
      productData.category = params[6];
      productData.type = params[7];
      productData.series = params[8];

      const data = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(
            'div.tech_specs_container.container.expanded > div > div.specs-wrapper.collapsed > div.specs-group > div > table > tbody > tr',
          ),
          (row) => Array.from(row.querySelectorAll('th, td'), (cell) => (cell as HTMLElement).innerText),
        ),
      );
      productData.specs = {};
      await Promise.all(
        data.map((cell) => {
          const key = cell[0].replace(/\W+/g, '');
          productData.specs[key.charAt(0).toLowerCase() + key.slice(1)] = cell[1];
        }),
      );
      await browser.close();
      await this.crawlerService.insertLenovoProduct(productData as ExtProductDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log(`LENOVO_PAGE_PRODUCT_${productData.model} processed in ${(Date.now() - start) / 1000}s`);
    }
  }
}
