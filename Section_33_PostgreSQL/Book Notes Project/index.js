import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import axios from "axios";

const testURL = "https://covers.openlibrary.org/b/olid/OL27371038M-L.jpg"; // 12 Rules for Life Cover Image

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: process.env.DB_PASSORD,
    port: 5433,
});

db.connect();

function retrieveCoverImg(url) {
    try {
        const response = axios.get(url);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM books ORDER BY title");
        res.render("index.ejs", { books: result.rows });
    } catch (err) {
        console.error(err);
        res.render("index.ejs", { books: [] });
    }
});

app.post("/add", async (req, res) => {
    const { title, author, coverImgUrl } = req.body;
    try {
        const coverImg = await retrieveCoverImg(coverImgUrl);
        await db.query(
            "INSERT INTO books (title, author, cover_img) VALUES ($1, $2, $3)",
            [title, author, coverImg || coverImgUrl]
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }
});

app.post("/delete", async (req, res) => {
    const { title } = req.body;
    try {
        await db.query("DELETE FROM books WHERE title = $1", [title]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }
});

app.post("/update", async (req, res) => {
    const { title, author, coverImgUrl } = req.body;
    try {
        const coverImg = await retrieveCoverImg(coverImgUrl);
        await db.query(
            "UPDATE books SET author = $2, cover_img = $3 WHERE title = $1",
            [title, author, coverImg || coverImgUrl]
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});