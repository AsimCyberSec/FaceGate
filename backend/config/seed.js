/**
 * Database Seeder - FaceGate Authentication System
 * Author: Asim Saeed - Database Engineer
 * Date: April 2026
 *
 * Seeds the database with initial admin user for testing.
 * Run with: node backend/config/seed.js
 *
 * WARNING: Only run in development environment.
 * Never seed production database with test data.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to database for seeding...');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    console.log('📦 Database is empty. Ready for face registration.');
    console.log('ℹ️ Register an admin user at http://localhost:8080/register');
    console.log('✅ Seed check complete.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();