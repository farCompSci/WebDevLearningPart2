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

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/add", (req, res) => {

    const title = req.body.title;
    const author = req.body.author;
    const coverImg = req.body.coverImg;

    res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
});