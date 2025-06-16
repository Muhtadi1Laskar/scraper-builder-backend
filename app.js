import express from "express";
import cors from 'cors';
import { scrapeFromConfig } from "./scraper/runners.js";

const port = process.env.port || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/build-scraper", async (req, res) => {
    try {
        const data = await scrapeFromConfig(req.body);

        res.json({ data });
    } catch (error) {
        console.log(error);
        res.send(500);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));