// Define the API URL
const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

// Make a GET request
fetch(apiUrl) // use the fetch request to make the get request
  .then(response => {
    if (!response.ok) { // if there is an error throw
      throw new Error('Network response was not ok');
    }
    return response.json(); // else, take in the response
  })
  .then(data => { // once we have the reponse, we pass it into data
    console.log('ISS Location (lat, long):', data['latitude'], data['longitude']);   
  })
  .catch(error => { // in case there is an error afterwards 
    console.error('Error:', error);
  });