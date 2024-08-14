const mongoose = require('mongoose');
const { resumeSchema } = require('../db/models/resumes');
const { User } = require('../db/db');

const Resume = mongoose.model('Resume', resumeSchema);

const saveResume = async (req, res) => {
  const { userId, newResume } = req.body;

  try {
    const resume = new Resume({
      user: userId,
      newResume,
    });

    await resume.save();

    await User.findByIdAndUpdate(
      userId,
      // eslint-disable-next-line no-underscore-dangle
      { $addToSet: { resumes: resume._id } },
      { new: true },
    );

    res.status(201).json({ message: 'Resume saved successfully' });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ error: 'Error saving resume' });
  }
};

module.exports = { saveResume };
