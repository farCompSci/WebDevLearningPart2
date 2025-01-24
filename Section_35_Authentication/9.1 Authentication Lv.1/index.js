import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: process.env.DB_PASSORD,
  port: 5433,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
    username,
  ]);
  if (checkUser.rows.length > 0) {
    res.render("register.ejs", { error: "User already exists" });
    return;
  }

  try {
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    res.render("secrets.ejs");
  } catch (err) {
    console.log(err);
  }

});

app.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const checkEmailAddress = await db.query("SELECT * FROM users WHERE email = $1", [
    username,
  ]);
  if (checkEmailAddress.rows.length > 0) {
    const checkPassword = checkEmailAddress.rows[0].password;
    if (checkPassword === password) {
      res.render("secrets.ejs");
    } else {
      res.render("login.ejs", { error: "Incorrect Password" });
    }
  } else {
    res.render("login.ejs", { error: "User not found" });
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
