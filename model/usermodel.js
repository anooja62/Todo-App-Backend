/** @format */

const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,

      max: 50,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
