const mongoose = require('mongoose');
const { resumeSchema } = require('../db/models/resumes');
const { AiCompanionResume } = require('../db/db');

const Resume = mongoose.model(process.env.DB_NAME, resumeSchema);
// POST endpoint to save resume
const saveResume = async (req, res) => {
  const { userId, resumeData, newResume } = req.body;

  try {
    // Create a new resume entry
    const resume = new Resume({
      user: userId,
      resumeData,
      newResume,
    });

    // Save the resume to the database
    await resume.save();

    // Optionally associate the resume with the user if you have this reference in the User schema
    await AiCompanionResume.findByIdAndUpdate(
      userId,
      { $addToSet: { resumes: resume._id } },
      { new: true },
    );

    res.status(201).json({ message: 'Resume saved successfully', resume });
  } catch (error) {
    res.status(500).json({ error: 'Error saving resume' });
  }
};

module.exports = { saveResume };
