# 🕷️ Scraper Builder Backend

The **Scraper Builder Backend** is a flexible and configurable web scraping engine built with **Playwright** and the **Strategy Pattern**. It allows users to define scraping logic through JSON configuration, supporting both single and multiple data extraction modes.

> ✅ Ideal for use with no-code/low-code frontends or integrated developer tools.

---

## 🚀 Features

* 🔧 **Strategy Pattern**: Supports multiple selector types (`tag`, `class`, `id`) and extraction modes (`single`, `multiple`).
* 🧠 **Smart Output Formatting**: Combines multiple extracted fields into structured objects.
* ⚙️ **Headless Browser Powered**: Uses [Playwright](https://playwright.dev/) for robust, JavaScript-enabled scraping.
* 🧩 **Pluggable Design**: Easy to extend with custom strategies or output formats.
* 📦 **Production-Ready Codebase**: Clean architecture with async support and error handling.

---

## 🛠️ Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/) v18+
* [Playwright](https://playwright.dev/)

Install dependencies:

```bash
npm install
npx playwright install
```

---

## 🧪 Example Usage

### 🔍 Sample Config

```js
const config = {
  targetURL: 'https://example.com/students',
  selectors: [
    { type: 'tag', value: 'td.name', name: 'name', mode: 'multiple' },
    { type: 'tag', value: 'td.age', name: 'age', mode: 'multiple' },
    { type: 'tag', value: 'td.roll', name: 'roll', mode: 'multiple' }
  ]
};
```

### 🧾 Output

```js
[
  { name: 'Alice', age: '22', roll: '101' },
  { name: 'Bob', age: '23', roll: '102' }
]
```

### Run

```js
import { scrapeFromConfig } from './scraper-builder.js';

scrapeFromConfig(config).then(console.log).catch(console.error);
```

---

## 📁 Project Structure

```
scraper-builder-backend/
│
├── scraper-builder.js        # Core scraper engine (strategy pattern)
├── configs/                  # (Optional) Example JSON configs
├── output/                   # (Optional) Save/export scraped data
└── README.md                 # Project documentation
```

---

## 📌 Supported Selector Types

| Type    | Mode            | Description                          |
| ------- | --------------- | ------------------------------------ |
| `tag`   | single/multiple | Use tag names like `h1`, `p`, `td`   |
| `class` | single/multiple | Use class names (without dot prefix) |
| `id`    | single          | Use element ID (without `#` prefix)  |

---

## 📦 Exporting (optional)

You can extend the scraper to export to `.json`, `.csv`, or integrate with APIs/databases.

---

## 🧱 Built With

* [Playwright](https://playwright.dev/)
* Node.js
* Modern JavaScript (ES Modules)

---

## 🧩 Future Features

* [ ] Pagination support
* [ ] Element attribute scraping (e.g., `href`, `src`)
* [ ] Dynamic wait/load support
* [ ] Frontend UI for config generation

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss the changes.

---

## 📄 License

MIT License

