const mongoose = require('mongoose');
const { resumeSchema } = require('../db/models/resumes');
const { User } = require('../db/db');

const Resume = mongoose.model('Resume', resumeSchema);
// POST endpoint to save resume
const saveResume = async (req, res) => {
  const { userId, newResume } = req.body;

  try {
    // Create a new resume entry
    const resume = new Resume({
      user: userId,
      newResume,
    });

    // Save the resume to the database
    await resume.save();

    // Optionally associate the resume with the user if you have this reference in the User schema
    await User.findByIdAndUpdate(
      userId,
      // eslint-disable-next-line no-underscore-dangle
      { $addToSet: { resumes: resume._id } },
      { new: true },
    );

    res.status(201).json({ message: 'Resume saved successfully', resume });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ error: 'Error saving resume' });
  }
};

module.exports = { saveResume };
