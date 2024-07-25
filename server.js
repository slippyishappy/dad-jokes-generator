require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get('/joke:theme?', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const timestamp = Date.now();
    const theme = req.params.theme || 'about anything';

    const prompt = `Write a short, one-sentence funny and understandable dad joke about ${theme}. Make it unique and different from previous jokes. Timestamp: ${timestamp}. Make sure to show only the joke.`;
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 100,
      },
    });

    const text = result.response.text();
    res.json({ joke: text });
  } catch (error) {
    console.error('Error generating joke:', error);
    res.status(500).json({ error: 'Failed to generate joke' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});