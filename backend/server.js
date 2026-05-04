require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const connectDB = require('../Database/config/db');
connectDB();

app.get('/', (req, res) => res.send('Backend running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));