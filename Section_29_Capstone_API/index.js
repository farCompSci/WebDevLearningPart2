import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const baseURL = 'https://openlibrary.org/search.json'

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index.ejs');
});

app.post('/search', async (req, res) => {
    try {
        const bookTitle = req.body.bookTitle;
        const author = req.body.author;

        const response = await axios.get(`${baseURL}?title="${bookTitle}"&author="${author}"`);
        
        let numResults = response.data.numFound;
        let borrowable = false;
        
        if (numResults > 0) {
            let availableBooks =response.data.docs[0].ebook_access === "borrowable";
            if (availableBooks) {
                borrowable = true;
            }
        }

        let returnData = {
            numResults: numResults,
            borrowable: borrowable
        };
        
        console.log(returnData);

        res.render('index.ejs', {
            numResults: numResults,
            borrowable: borrowable
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.render('index.ejs', { numResults: 0, borrowable: false });
    }
});


app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})