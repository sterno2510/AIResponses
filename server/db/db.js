const mongoose = require('mongoose');
const { userSchema } = require('./models/user');

require('dotenv').config();

mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.DB_NAME}`)
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

const AiCompanionResume = mongoose.model(process.env.DB_NAME, userSchema);

const saveOrUpdateUser = (username, email) => AiCompanionResume.findOneAndUpdate(
  { email },
  {
    name: username,
    email,
    $inc: { visitCount: 1 },
  },
  { new: true, upsert: true },
)
  .then((updatedUser) => {
    console.log('User saved or updated:', updatedUser);
    return updatedUser.visitCount;
  })
  .catch((error) => {
    console.error('Error saving or updating user:', error);
    throw error;
  });

module.exports = { saveOrUpdateUser };
