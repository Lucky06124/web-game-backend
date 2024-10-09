const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define a POST route that triggers the API call
app.post('/', async (req, res) => {
    try {
        // Extract the query from the request body
        const { query } = req.body;

        if (!query) {
            return res.status(400).send('Query parameter is missing');
        }

        // Construct the external API URL with the query
        const url = `https://gametrix.org/${query}`;

        // Send GET request to the external API using the query
        const response = await axios.get(url);
        
        // Log the response data to the console
        console.log(response.data);
        
        // Send the response data to the client
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
