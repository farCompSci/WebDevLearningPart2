import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";

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

app.post("/edit", (req, res) => {});

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
});