const mongoose = require('mongoose');
mongoose.deleteModel(/.*/)
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  role: { type: String },
  faceImage: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { strict: false });
module.exports = mongoose.model('User', UserSchema);
