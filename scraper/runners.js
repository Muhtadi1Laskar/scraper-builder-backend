import { chromium } from 'playwright';
import { scrapeStrategies } from './scraperStrategy.js';

const scrapeMultiple = async (page, config) => {
  const fieldsArray = {};

  for (const selector of config.selectors) {
    const strategyType = scrapeStrategies[selector.type];
    if (!strategyType) continue;

    const strategyFn = strategyType[selector.mode];
    if (!strategyFn) continue;

    try {
      fieldsArray[selector.name] = await strategyFn(page, selector);
    } catch (error) {
      fieldsArray[selector.name] = [];
      console.error(`Error scraping ${selector.name}`, err);
    }
  }

  const keys = Object.keys(fieldsArray);
  const length = Math.max(...keys.map(k => fieldsArray[k].length));
  const results = [];

  for (let i = 0; i < length; i++) {
    const row = {};
    for (const key of keys) {
      row[key] = fieldsArray[key][i] || null;
    }
    results.push(row);
  }
  return results;
}

const scrapeSingle = async (page, config) => {
  const results = {};

  for (const selector of config.selectors) {
    const strategyType = scrapeStrategies[selector.type];
    if (!strategyType) continue;

    const strategyFn = strategyType[selector.mode];
    if (!strategyFn) continue;

    try {
      results[selector.name] = await strategyFn(page, selector);
    } catch (error) {
      results[selector.name] = [];
      console.error(`Error scraping ${selector.name}, `, error);
    }
  }
  return results;
}

export async function scrapeFromConfig(config) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(config.targetURL);

  const multipleMode = config.selectors.some(sel => sel.mode === 'multiple');

  if (multipleMode) {
    const data = await scrapeMultiple(page, config);
    await browser.close();
    return data;

  } else {
    const datas = await scrapeSingle(page, config);
    await browser.close();
    return datas;
  }
}
