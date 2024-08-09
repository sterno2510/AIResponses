const { mongoose } = require('mongoose');

const { Schema } = mongoose;

const resumeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: process.env.DB_NAME,
      required: true,
    },
    resumeData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    newResume: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = { resumeSchema };
