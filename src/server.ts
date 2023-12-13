import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { whitelistMiddleware } from './middleware';
import { User } from './models';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(whitelistMiddleware); // Apply whitelistMiddleware globally

// MongoDB Connection
const DB_CONN_STRING = process.env.DB_CONN_STRING || '';
const DB_NAME = process.env.DB_NAME || '';
const COL = process.env.USER_COLLECTION_NAME ||'';

// Check if required environment variables are defined
if (!DB_CONN_STRING || !DB_NAME) {
  console.error('Missing MongoDB Atlas connection string or database name');
  process.exit(1);
}


mongoose.connect(DB_CONN_STRING)
.then(async () => {
  console.log('Connected to MongoDB Atlas');

  // Check if the specified collection exists in the specified database
  const db = mongoose.connection.db;
  const collections = await db.listCollections({ name: COL }).toArray();

  if (collections.length === 0) {
    console.error(`Collection '${COL}' not found in database '${DB_NAME}'`);
    process.exit(1);
  }

  console.log(`Collection '${COL}' found in database '${DB_NAME}'`);


})
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


// Routes
app.post('/', async (req, res) => {
  try {
    // The whitelistMiddleware will run before reaching this route handler
    const userData = req.body;
    const user = await User.create(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/:email', async (req, res) => {
  try {
    // The whitelistMiddleware will run before reaching this route handler
    const email = req.params.email;
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
