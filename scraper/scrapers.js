import { scrapeStrategies } from "./scraperStrategy.js";

export const scrapeMultiple = async (page, config) => {
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

export const scrapeSingle = async (page, config) => {
    const results = {};
    const final = []

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
    final.push(results);

    return final;
}