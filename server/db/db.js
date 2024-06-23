require('dotenv').config();
const mongoose = require('mongoose');

// It's not a good idea to hardcode connection credentials here.
// Configure process.env variables in ../.env and use them
// in your connection code: e.g. process.env.DB_NAME

// TODO: Set up a connection to the "expresso" MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/AiCompanionResume'); // Fix this string

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AiCompanionResume = mongoose.model('AiCompanionResume', resumeSchema);

module.exports = AiCompanionResume;
