const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1268179200570032169/_apmXO7dJpYbe0E_oZBImQPs4w3gEDiPxsQ2wqSTGyco_o1H7nwzE-1xYhNH05icT1Pl';

app.get('/check-webhook', async (req, res) => {
    try {
        // Simulating a request to the webhook (Note: Discord webhooks typically do not have a metadata retrieval endpoint)
        // This is for demonstration purposes only.
        const response = await axios.get(WEBHOOK_URL);

        // Simulating a check for "skibidi rizzler" (Note: Discord API does not provide this functionality)
        const isValid = response.data.name === 'skibidi rizzler';

        res.json({ valid: isValid });
    } catch (error) {
        console.error('Error checking webhook:', error);
        res.status(500).json({ valid: false });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
