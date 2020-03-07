const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  shippingAddress: {
    type: String,
    required: true
  },
  userInfo: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  orderedGames: [
    {
      _id: { id: false },
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        default: 1
      },
      price: {
        type: String,
        required: true
      }
    }
  ],
  totalPrice: {
    type: String,
    required: [true, "Please provide total order price"]
  },
  deliveryType: {
    type: String,
    default: "regular"
  },

  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
