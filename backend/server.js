// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 4000;

const API_KEY = 'eaf33c58-c868-41b7-80ea-eaaf16c85b67';

app.use(cors());

app.get('/api/prices', async (req, res) => {
  try {
    const ids = '1,2010'; // BTC, ADA
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${ids}`, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY
      }
    });
    const data = await response.json();

    res.json({
      BTC: data.data['1'].quote.USD.price,
      ADA: data.data['2010'].quote.USD.price
    });
  } catch (err) {
    console.error('CMC Fetch Error', err);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

app.listen(PORT, () => {
  console.log(`CMC Proxy running at http://localhost:${PORT}`);
});
