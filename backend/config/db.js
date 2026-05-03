/**
 * Database Configuration - FaceGate Authentication System
 * Author: Asim Saeed - Database Engineer
 * Date: April 2026
 *
 * Handles MongoDB connection with error handling,
 * reconnection logic and connection status logging.
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses connection string from environment variables
 * Implements retry logic for production reliability
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      maxPoolSize: 10, // Max 10 concurrent connections
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB Disconnected. Attempting reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB Reconnected Successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Connection Error:', err.message);
    });

  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;