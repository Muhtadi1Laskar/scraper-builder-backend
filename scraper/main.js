import { scrapeFromConfig } from './runners.js';


(async () => {
    const config = {
        targetURL: 'https://www.rokomari.com/book/category/911/horror-and-supernatural',
        selectors: [
            { type: 'class', value: 'book-title', name: 'bookTitle', mode: 'multiple' },
            { type: 'class', value: 'book-author', name: 'bookAuthor', mode: 'multiple' },
            { type: 'class', value: 'book-price', name: 'bookPrice', mode: 'multiple' },
        ]
    };
    const data = await scrapeFromConfig(config);
    console.log(data);
})()