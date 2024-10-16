import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Starting the app
const app = express();
const port = 3000;

// Setting up our middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Seting up the blog posts
const posts = {};

// Setting up home page
app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });  
});

// Setting up the add post page
app.get("/addPost", (req, res) => {
    res.render("addPost.ejs");
});

// Setting up the submit post page
app.post("/submitPost", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    posts[title] = { title, content, author };

    res.render("index.ejs", { posts: posts });
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});