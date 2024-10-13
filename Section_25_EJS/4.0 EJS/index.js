import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import ejs from "ejs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

/**
 * Function to check if today is a weekday
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * 
 * @return {boolean} - true if today is a weekday, else false
 */
function isWeekDay(req,res,next){
    const now = new Date(); 
    const day = now. getDay();
    if (day < 5) {
        return true;
    } else {
        return false;
    }
    next();
}


app.get("/", (req, res) => {
    let toSend;
    if(isWeekDay(req,res)){
        toSend = "Weekday! Time to work!";
    }else{
        toSend = "Weekend, Time to relax!";
    }
    res.render("index.ejs",{
        advise: toSend
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})