const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const QUOTES = [
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "You are confined only by the walls you build yourself.", author: "Andrew Murphy" },
    { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { text: "Small steps every day.", author: "Unknown" },
    { text: "Great things are done by a series of small things brought together.", author: "Vincent Van Gogh" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Well done is better than well said.", author: "Benjamin Franklin" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
    { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
    { text: "Don't limit your challenges. Challenge your limits.", author: "Unknown" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
    { text: "The harder the conflict, the greater the triumph.", author: "George Washington" },
    { text: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", author: "Christian D. Larson" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
];

function getRandomQuote(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

app.get('/api/quote', (req, res) => {
    try {
        const q = getRandomQuote(QUOTES);
        return res.json({ quote: q });
    } catch (error) {
        console.error("Quote Error: ", error);
        return res.status(500).json({ error: "Could not fetch quote." });
    }
});

/* /api/weather — using WeatherAPI.com */
app.get('/api/weather', async (req, res) => {
    const city = (req.query.city || 'London').trim();

    if (!WEATHER_API_KEY) {
        // Fallback if no API key provided
        return res.json({
            city,
            tempC: 25,
            tempF: 77,
            description: 'Partly cloudy (mock data)',
            source: 'mock_fallback'
        });
    }

    try {
        // Call WeatherAPI.com forecast endpoint
        const url = `http://api.weatherapi.com/v1/current.json`;
        const weatherRes = await axios.get(url, {
            params: {
                key: WEATHER_API_KEY,
                q: city,
                days: 1,
                aqi: 'no',
                alerts: 'no'
            },
            timeout: 5000
        });

        const location = weatherRes.data.location;
        const current = weatherRes.data.current;
        if (!location || !current) {
            return res.status(500).json({ error: 'Invalid weather data from API.' });
        }

        // Simplify the response
        const tempC = current.temp_c;
        const tempF = current.temp_f;
        const description = current.condition ? current.condition.text : 'N/A';

        return res.json({
            city: location.name,
            tempC: Number(tempC.toFixed(1)),
            tempF: Number(tempF.toFixed(1)),
            description,
            source: 'weatherapi.com'
        });
    } catch (err) {
        console.error('Weather API error:', err.message);
        return res.status(500).json({ error: err.message || 'Could not fetch weather data.' });
    }
});


app.get('/api/currency', async (req, res) => {
    const amountRaw = req.query.amount || '100';
    const amount = Number(amountRaw);
    if (Number.isNaN(amount) || amount < 0) {
        return res.status(400).json({ error: 'Invalid amount query parameter.' });
    }

    try {
        const url = `https://api.exchangerate.host/convert`;
        const [rUsd, rEur] = await Promise.all([
            axios.get(url, { params: { from: 'INR', to: 'USD', amount }, timeout: 5000 }),
            axios.get(url, { params: { from: 'INR', to: 'EUR', amount }, timeout: 5000 })
        ]);
        const usd = rUsd.data && rUsd.data.result ? Number(rUsd.data.result.toFixed(4)) : null;
        const eur = rEur.data && rEur.data.result ? Number(rEur.data.result.toFixed(4)) : null;
        if (usd == null || eur == null) throw new Error('Invalid response from exchange API');
        return res.json({
            amountINR: amount,
            usd,
            eur
        });
    } catch (err) {
        console.error('Currency fetch error', err?.response?.data || err.message);
        
        const MOCK_USD_RATE = 0.012;
        const MOCK_EUR_RATE = 0.011;
        return res.json({
            amountINR: amount,
            usd: Number((amount * MOCK_USD_RATE).toFixed(4)),
            eur: Number((amount * MOCK_EUR_RATE).toFixed(4)),
        });
    }
});

app.listen(PORT, () => {
    console.log(`InfoHub server listening on port ${PORT}`);
});

