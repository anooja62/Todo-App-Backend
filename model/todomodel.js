/** @format */

const mongoose = require("mongoose");
const todoSchema = mongoose.Schema(
  {
    userid: {
      type: String,
    },

    task: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
