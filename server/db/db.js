require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

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

const AiCompanionResume = mongoose.model(process.env.DB_NAME, resumeSchema);

module.exports = AiCompanionResume;
