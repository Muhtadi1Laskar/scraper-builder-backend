export const scrapeStrategies = {
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
}