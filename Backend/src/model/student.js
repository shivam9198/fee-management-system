
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  feesPaid: { type: Boolean, default: false },
});

module.exports = mongoose.model('Student', studentSchema);