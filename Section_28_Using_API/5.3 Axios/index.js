import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    // console.log(result); // looking at the structure
    res.render("index.ejs", { data: result });
  } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body); // the structure is { type: 'education', participants: '' }
      
    const type = req.body.type;
    const participants = req.body.participants;
    let url = "https://bored-api.appbrewery.com/filter"; // keep the default url first 

    if (participants !== "" && type !== "") {
      url += `?participants=${participants}&type=${type}`; // add both type and participants if we have them
    } else if (participants !== "") {
      url += `?participants=${participants}`;
    } else if (type !== "") {
      url += `?type=${type}`;
    }

    try {
      const response = await axios.get(url);
      const result = response.data;
      // console.log(result);
      res.render("index.ejs", { data: result[0] }); // could be made better by doing a random activity
      // res.render("index.ejs", { data: result });
    } 
    catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
      error: error.message,
    });
    }

    // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

/**
 * the response from random api 
 {
  activity: 'Mow your lawn',
  availability: 0.3,
  type: 'busywork',
  participants: 1,
  price: 0.1,
  accessibility: 'Minor challenges',
  duration: 'minutes',
  kidFriendly: true,
  link: '',
  key: '3590127'
}
 */