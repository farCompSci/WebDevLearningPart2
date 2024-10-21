import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.send("<h1>Hello from the other side!</h1>");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})