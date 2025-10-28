// Import required packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Express middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ 
    message: "Vyshnav's Express Server is running",
    timestamp: new Date().toISOString()
  });
});

// MongoDB Atlas Connection
const mongoUri = 'mongodb+srv://vyshnavdev224815_db_user:sQsh2yFcbXfxdlIv@cluster0.er3ouv5.mongodb.net/vyshnav_book_inventory?retryWrites=true&w=majority';

// Enhanced MongoDB connection with event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log(`📖 Database: vyshnav_book_inventory`);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB Disconnected');
});

// Connect to MongoDB Atlas
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// API Routes
const vyshnavBooksRouter = require('./routes/vyshnavBooks.routes');
app.use('/api/books', vyshnavBooksRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 Vyshnav Express Server Details:');
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`📚 API: http://localhost:${PORT}/api/books`);
  console.log(`🔍 Test: http://localhost:${PORT}/test`);
});
