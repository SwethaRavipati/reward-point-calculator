const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    default: "",
  },
  orderTotal: {
    type: Number,
    default: 0,
  }
});

const Transaction = mongoose.model("transaction", TransactionSchema);

module.exports = Transaction;