const express = require('express');
const router = express.Router();
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log('Register request body:', req.body); // debug
    const { name, email, role, faceImage } = req.body;
    
    if (!email) return res.status(400).json({ error: 'Email is required' });
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'A user with this email is already registered' });
    
    const user = new User({ name, email, role: role || 'user', faceImage });
    await user.save();
    res.json({ user: { id: user._id, name, email, role: user.role, createdAt: user.createdAt } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN WITH FACE
router.post('/login-face', async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) throw new Error('No registered faces');
    const user = users[0];
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// GET ALL USERS
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users: users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt })) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE USER
router.delete('/user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;