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
app.use(express.json());

// Setting up the blog posts
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
});

// Delete post route
app.delete("/post/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title);
    if (posts[title]) {
        delete posts[title];
        res.json({ message: 'Post deleted successfully' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// New route for editing a post
app.get("/editPost/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title);
    const post = posts[title];
    if (post) {
        res.render("editPost.ejs", { post: post });
    } else {
        res.status(404).send("Post not found");
    }
});

// New route for updating a post
app.post("/updatePost/:title", (req, res) => {
    const oldTitle = decodeURIComponent(req.params.title);
    const { title, content, author } = req.body;

    if (posts[oldTitle]) {
        delete posts[oldTitle];
        posts[title] = { title, content, author };
        res.redirect("/");
    } else {
        res.status(404).send("Post not found");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});