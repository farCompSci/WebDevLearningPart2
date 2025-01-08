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
  port: 5433,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 2;



/**
 * Queries the database for all the countries that the current user has visited.
 * @return {Array} - An array of the country codes that the current user has visited.
 */
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries JOIN users on users.id = visited_countries.user_id WHERE user_id = $1; ", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

/**
 * Queries the database for all users and returns an array of user objects.
 * Each user object contains an id, name, and color property.
 * @return {Array} - An array of the current user.
 */
async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  const users = result.rows;
  const user = users.find((user) => user.id == currentUserId);
  return user;
}

/**
 * Queries the database for all users and returns an array of user objects.
 * Each user object contains an id, name, and color property.
 * @return {Array} - An array of user objects.
 */
async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  // console.log(typeof result.rows);
  return result.rows;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  const users = await getUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: 'teal'
    // color: `${currentUser.color}`,
  });
  // console.log(currentUser.color);
});

app.post("/add", async (req, res) => {
  const input = await req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;", 
    [name, color]
  );

  currentUserId = result.rows[0].id;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
