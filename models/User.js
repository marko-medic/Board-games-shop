const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please provide user email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide user password"]
  },

  role: {
    type: String,
    default: "user"
  },

  country: {
    type: String,
    required: [true, "Please provide user country"]
  },

  registrationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
