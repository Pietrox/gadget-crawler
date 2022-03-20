import { QueueEnum } from '@app/enums';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { LooseObjectInterface } from '@app/interfaces';
import * as getUuid from 'uuid-by-string';
import { Logger } from '@nestjs/common';
import { CrawlerService } from '../crawler.service';
import { AsusDto } from '@app/dto/product.dto';
import { filter, findIndex } from 'lodash';

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
          const productResponse = JSON.parse(await response.text());
          const modelName = await (
            await page.$$(`${job.data.utils.modelSelectorDOM}[class*=${job.data.utils.modelSelector}]`)
          )[0].evaluate((el) => el.innerText);

          const compareObject = filter(productResponse.sections, (object) => {
            return object.type.includes(job.data.utils.productDataFilter);
          });
          const modelIndex = findIndex(compareObject[0].compareSeries, (object) => {
            const modelNameTail = modelName.split(' ').pop();
            return object.text.endsWith(modelNameTail);
          });
          compareObject.map((compareDataObject) => {
            compareDataObject.content.map((content) => {
              const indexedObject = content.details[modelIndex];
              const heading = indexedObject.heading.replace(/\W+/g, '');
              const headingData = indexedObject.content.map((data) => {
                return data.replace('<span>', '').replace('</span>', '');
              });
              productData[heading.toLowerCase()] = headingData.join(', ');
            });
          });
          const params = page.url().split('/');
          productData.category = params[5];
          productData.model = modelName;
        }

      });
      await page.goto(job.data.url);
      await page.click(`${job.data.utils.promoSelectorDOM}[class*=${job.data.utils.promoSelector}]`);
      await browser.close();
      await this.crawlerService.insertSamsungProduct(productData as AsusDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log(`SAMSUNG_PAGE_PRODUCT_${productData.model} processed in ${(Date.now() - start) / 1000}s`);
    }
  }
}
