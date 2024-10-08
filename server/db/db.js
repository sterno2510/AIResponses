const mongoose = require('mongoose');
const { userSchema } = require('./models/user');

require('dotenv').config();

mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.DB_NAME}`)
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

const User = mongoose.model('User', userSchema);

const saveOrUpdateUser = (username, email) => User.findOneAndUpdate(
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
    return updatedUser;
  })
  .catch((error) => {
    console.error('Error saving or updating user:', error);
    throw error;
  });

module.exports = { saveOrUpdateUser, User };
