import { chromium } from 'playwright';
import { scrapeMultiple, scrapeSingle } from './scrapers.js';


export async function scrapeFromConfig(config) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(config.targetURL);

  const title = await page.title();

  const multipleMode = config.selectors.some(sel => sel.mode === 'multiple');

  if (multipleMode) {
    const data = await scrapeMultiple(page, config);
    data.push({ websiteName: title });
    await browser.close();
    return data;

  } else {
    const datas = await scrapeSingle(page, config);
    datas.push({ websiteName: title });
    await browser.close();
    return datas;
  }
}
