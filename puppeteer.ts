import { TimeHelper } from '@app/helpers/time.helper';

const puppeteer = require('puppeteer');
const userAgents = require('user-agents');

interface LooseObject {
  [key: string]: any;
}

async function puppeteerRun() {
  const browser = await puppeteer.launch({ headless: true });
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
  await page.goto('https://www.asus.com/Mobile/Phones/ZenFone/Zenfone-8/');
  await page.screenshot({ path: 'test.png' });
  await page.waitForSelector('div.btn-asus.btn-ok.btn-read-ck');
  await page.click('div.btn-asus.btn-ok.btn-read-ck');
  await TimeHelper.delay(500, 2000);

  const productData: LooseObject = {};

  const topElements = await page.$$('div[class*=LevelFourProductPageHeaderDesktop__tabItemLink__]');
  await Promise.all(
    topElements.map(async (element) => {
      const data = await element.evaluate((el) => el.innerText);
      if (data === 'Tech Specs') {
        // Get name of product
        const params = page.url().split('/');
        productData.category = params[3];
        productData.type = params[4];
        productData.series = params[5];
        productData.model = params[6];
        const techSpecs = await page.$x(`//div[contains(text(), '${data}')]`);
        await techSpecs[0].click();
      }
    }),
  );
  await page.waitForNavigation();
  await TimeHelper.delay(100, 1000);
  const specContainer = await page.$x('//div[contains(@class, "TechSpec__techSpecContainer__")]');
  const specDivs = await specContainer[0].$x('div');
  await Promise.all(
    specDivs.map(async (parentDiv) => {
      const h2 = await parentDiv.$x('h2');
      const h2Text = await h2[0].evaluate((el) => el.innerText);
      const childDiv = await parentDiv.$x('div');
      productData[h2Text.toLocaleLowerCase()] = await childDiv[0].evaluate((el) => el.innerText);
    }),
  );
  await browser.close();
}

puppeteerRun();