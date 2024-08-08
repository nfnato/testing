const express = require('express');
const app = express();

app.get('/webhook', (req, res) => {
    // Extract the 'name' parameter from the query string
    const name = req.query.name;

    // Check if the 'name' parameter is 'sigma rizzler'
    if (name === 'sigma rizzler') {
        res.status(200).send('active');
    } else {
        res.status(400).send('Invalid name');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
