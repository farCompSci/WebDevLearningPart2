import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


dotenv.config();
let pwd = process.env.DB_PASSORD;

/**
 * Connect to the database
 */
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: pwd,
  port: 5433,
});

db.connect();

db.on("error", (err) => {
  console.log(err);
});


app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM list_items");
  const items = result.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO list_items (title) VALUES ($1)", [item]);
  } catch (err) {
    console.log(err);
  }
  finally {
    res.redirect("/");
  }
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
