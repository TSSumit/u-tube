import express from 'express';
import { default as fetch } from 'node-fetch';
import { YoutubeSearchSuggestion_URL } from './src/utils/constants.js'; // Ensure this path is correct

const app = express();
const PORT = 5000; // Port number for the proxy server

// Endpoint to handle search suggestions
app.get('/search-suggestions', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await fetch(`${YoutubeSearchSuggestion_URL}${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
