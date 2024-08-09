const { mongoose } = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
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
    resumes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = { userSchema };
