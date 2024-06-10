const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://dmadhusudhan98:Dmadhusudhan123@blackcoffer.hyuau97.mongodb.net/blackcoffer?retryWrites=true&w=majority&appName=blackcoffer', {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the data schema
const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const Data = mongoose.model('blackcoffer', dataSchema);

// API routes
app.get('/api/data', async (req, res) => {
  try {
    const { start_year, end_year, topic, sector, region, pestle, source, country } = req.query;
    const filters = {};

    if (start_year) filters.start_year = start_year;
    if (end_year) filters.end_year = end_year;
    if (topic) filters.topic = topic;
    if (sector) filters.sector = sector;
    if (region) filters.region = region;
    if (pestle) filters.pestle = pestle;
    if (source) filters.source = source;
    if (country) filters.country = country;

    // Find data with filters
    const data = await Data.find(filters).maxTimeMS(30000).exec();

    if (data.length === 0) {
      console.log('No documents found in collection');
    } else {
      console.log(`Retrieved ${data.length} documents from the collection`);
    }

    res.json(data);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/data/data', async (req, res) => {
  try {
    const { start_year, end_year, topic, sector, region, pestle, source, country } = req.query;
    const filters = {};

    if (start_year) filters.start_year = start_year;
    if (end_year) filters.end_year = end_year;
    if (topic) filters.topic = topic;
    if (sector) filters.sector = sector;
    if (region) filters.region = region;
    if (pestle) filters.pestle = pestle;
    if (source) filters.source = source;
    if (country) filters.country = country;

    // Find data with filters
    const data = await Data.find(filters).sort({ relevance: -1 }).limit(10).exec();
    
    if (data.length === 0) {
      console.log('No documents found in collection');
    } else {
      console.log(`Retrieved ${data.length} documents from the collection`);
    }

    res.json(data);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
