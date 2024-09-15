const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhaarNumber: { type: String, required: true },
  password: { type: String, required: true },
  products: { type: Array, default: [] },
  buyerRequest: { type: Array, default: [] },
  sellerAcceptRequest: { type: Array, default: [] },
  sellerRejectRequest: { type: Array, default: [] },
});

// Inside your database connection function, use the returned connection to create the model
async function createUdyogSetuUserModel(udyogSetuConnection) {
  const userModel = udyogSetuConnection.model("userModel", userSchema);
  return userModel;
}

module.exports = createUdyogSetuUserModel;
