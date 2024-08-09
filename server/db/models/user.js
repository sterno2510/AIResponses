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
  },
  {
    timestamps: true,
  },
);

module.exports = { userSchema };
