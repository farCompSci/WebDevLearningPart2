import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Creating the app and setting up port
const app = express();
const port = 3000;

// First middleware
app.use(bodyParser.urlencoded({extended:true}));


// Custom middleware function
function checkPassword(req,res,next){
    let userInputPassword = req.body['password'];
    if (userInputPassword === "ILoveProgramming"){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
    }
    next();
}

// Use custom middleware
app.use(checkPassword);

// Handling get request
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

// Handling post from html form 
app.post("/check",(req,res)=>{
    checkPassword;
})

// Listening on the port for any changes 
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
