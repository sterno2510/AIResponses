require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.DB_NAME}`)
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    visitCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const AiCompanionResume = mongoose.model(process.env.DB_NAME, resumeSchema);

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
