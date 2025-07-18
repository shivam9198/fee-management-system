// backend/src/routes/student.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const Student = require('../model/student');
const User = require('../model/user'); 


router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error fetching students');
  }
});


router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ userId: req.user.id });

    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    res.status(200).json(studentProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error fetching profile');
  }
});


router.put('/profile', authenticateToken, async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id; // From JWT payload

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    // Update user's main auth record
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    user.email = email;
    await user.save();

    // Update corresponding student record
    const student = await Student.findOneAndUpdate(
      { userId: userId },
      { name, email },
      { new: true } // Return the updated document
    );

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found for update' });
    }

    res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error updating profile');
  }
});


router.post('/profile/pay-fees', authenticateToken, async (req, res) => {
  const userId = req.user.id; // From JWT payload

  try {
    const student = await Student.findOneAndUpdate(
      { userId: userId },
      { feesPaid: true },
      { new: true } // Return the updated document
    );

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found for fee update' });
    }

    res.status(200).json({ message: 'Fees paid status updated successfully', student });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error updating fee status');
  }
});

module.exports = router;