import { chromium } from 'playwright';

// Strategy pattern for different selector types and modes
const scrapeStrategies = {
  tag: {
    single: async (page, selector) => {
      return await page.$eval(selector.value, el => el.textContent.trim());
    },
    multiple: async (page, selector) => {
      return await page.$$eval(selector.value, els => els.map(el => el.textContent.trim()));
    },
  },
  class: {
    single: async (page, selector) => {
      return await page.$eval(`.${selector.value}`, el => el.textContent.trim());
    },
    multiple: async (page, selector) => {
      return await page.$$eval(`.${selector.value}`, els => els.map(el => el.textContent.trim()));
    },
  },
  id: {
    single: async (page, selector) => {
      return await page.$eval(`#${selector.value}`, el => el.textContent.trim());
    },
    multiple: async (page, selector) => {
      return [await page.$eval(`#${selector.value}`, el => el.textContent.trim())];
    },
  },
};

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



}

export async function scrapeFromConfig(config) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(config.targetURL);

  const multipleMode = config.selectors.some(sel => sel.mode === 'multiple');

  if (multipleMode) {
    // Step 1: Collect all results per selector
    // const fieldArrays = {};

    // for (const selector of config.selectors) {
    //   const strategyType = scrapeStrategies[selector.type];
    //   if (!strategyType) continue;

    //   const strategyFn = strategyType[selector.mode];
    //   if (!strategyFn) continue;

    //   try {
    //     fieldArrays[selector.name] = await strategyFn(page, selector);
    //   } catch (err) {
    //     fieldArrays[selector.name] = [];
    //     console.error(`Error scraping ${selector.name}:`, err);
    //   }
    // }

    // // Step 2: Merge values by index into objects
    // const keys = Object.keys(fieldArrays);
    // const length = Math.max(...keys.map(k => fieldArrays[k].length));
    // const results = [];

    // for (let i = 0; i < length; i++) {
    //   const row = {};
    //   for (const key of keys) {
    //     row[key] = fieldArrays[key][i] || null;
    //   }
    //   results.push(row);
    // }

    // await browser.close();
    const data = await scrapeMultiple(page, config);
    await browser.close();
    return data;

  } else {
    // Single value scrape
    const result = {};
    for (const selector of config.selectors) {
      const strategyType = scrapeStrategies[selector.type];
      if (!strategyType) continue;

      const strategyFn = strategyType[selector.mode];
      if (!strategyFn) continue;

      try {
        result[selector.name] = await strategyFn(page, selector);
      } catch (err) {
        result[selector.name] = null;
        console.error(`Error scraping ${selector.name}:`, err);
      }
    }

    await browser.close();
    return result;
  }
}

// Example usage
/*
const config = {
  targetURL: 'https://example.com',
  selectors: [
    { type: 'tag', value: 'h1', name: 'mainTitle', mode: 'single' },
    { type: 'tag', value: 'p', name: 'paragraphs', mode: 'multiple' },
    { type: 'class', value: 'product-title', name: 'products', mode: 'multiple' },
    { type: 'id', value: 'footer', name: 'footerText', mode: 'single' },
  ]
};

scrapeFromConfig(config).then(console.log);
*/
