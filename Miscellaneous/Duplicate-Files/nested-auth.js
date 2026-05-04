const express = require('express');
const router = express.Router();
const User = require('../models/User');

// REGISTER — save face descriptor array
router.post('/register', async (req, res) => {
  try {
    console.log('Register request body:', { ...req.body, faceDescriptor: 'array' });
    const { name, email, role, faceDescriptor } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (!faceDescriptor) return res.status(400).json({ error: 'Face data is required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'A user with this email is already registered' });
    const user = new User({ name, email, role: role || 'user', faceDescriptor });
    await user.save();
    res.json({ user: { id: user._id, name, email, role: user.role, createdAt: user.createdAt } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN — compare face descriptors
router.post('/login-face', async (req, res) => {
  try {
    const { faceDescriptor } = req.body;
    if (!faceDescriptor) return res.status(400).json({ error: 'Face data required' });
    const users = await User.find();
    if (users.length === 0) return res.status(401).json({ error: 'No registered faces' });

    const THRESHOLD = 0.6;
    let matchedUser = null;

    for (let user of users) {
      if (!user.faceDescriptor || user.faceDescriptor.length === 0) continue;
      const distance = euclideanDistance(user.faceDescriptor, faceDescriptor);
      console.log(`Distance for ${user.name}: ${distance}`);
      if (distance < THRESHOLD) {
        matchedUser = user;
        break;
      }
    }

    if (matchedUser) {
      res.json({ user: { id: matchedUser._id, name: matchedUser.name, email: matchedUser.email, role: matchedUser.role, createdAt: matchedUser.createdAt } });
    } else {
      res.status(401).json({ error: 'Face not recognized' });
    }
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

function euclideanDistance(arr1, arr2) {
  return Math.sqrt(
    arr1.reduce((sum, val, i) => sum + Math.pow(val - arr2[i], 2), 0)
  );
}

module.exports = router;