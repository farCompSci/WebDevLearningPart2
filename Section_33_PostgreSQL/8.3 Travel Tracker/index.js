import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
const port = 3000;

dotenv.config();
let pwd = process.env.DB_PASSORD;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: pwd,
  port: 5433
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country)=>{
    countries.push(country.country_code);
  })
  res.render("index.ejs",{'countries':countries, total:countries.length});
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
