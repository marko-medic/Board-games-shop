const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide game name"]
  },
  price: {
    type: String,
    required: [true, "Please provide game price"]
  },
  imageURL: {
    type: String,
    default: "/images/default.jpg"
  },
  description: {
    type: String,
    required: [true, "Please provide game description"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Game", GameSchema);
