const { mongoose } = require('mongoose');
const { userSchema } = require('../db/models/user');

const User = mongoose.model('User', userSchema);

const retrieveResumes = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    const user = await User.findById(userId).populate('resumes');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ resumes: user.resumes });
  } catch (error) {
    console.error('Error retrieving resumes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  retrieveResumes,
};
