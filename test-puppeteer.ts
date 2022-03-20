const puppeteer = require('puppeteer');
const userAgents = require('user-agents');
import { filter, findIndex } from 'lodash';

interface LooseObject {
  [key: string]: any;
}

function delay(min: number, max: number) {
  const ms = randomTime(min, max);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomTime(min, max): number {
  return Math.random() * (max - min) + min;
}

async function puppeteerRun() {
  const productData: LooseObject = {};
  const browser = await puppeteer.launch({ headless: false });
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

  page.on('response', async (response) => {
    if (response.url().includes('/configurator/features/') && response.url().includes('b2b.json')) {
      const productResponse = JSON.parse(await response.text());
      await page.click(`a[class*=gnb-promo-close]`);
      const modelName = await (await page.$$(`h1[class*=oos-title2]`))[0].evaluate((el) => el.innerText);

      const compareObject = filter(productResponse.sections, (object) => {
        return object.type.includes('compare-palette-section');
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
          productData.specs[heading.toLowerCase()] = headingData.join(', ');
        });
      });
      const params = page.url().split('/');
      productData.category = params[5];
      productData.model = modelName;
      await delay(1000, 2000);
      await browser.close();
    }
  });
  await page.goto('https://www.samsung.com/us/business/tablets/galaxy-tab-s8/buy/2022-02-23/');
  await delay(1000, 2000);
}

puppeteerRun();
