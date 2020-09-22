const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  _id: { type: Number, required: true, index: true, unique: true },
  name: { type: String, required: true, index: true, unique: true },
  level: { type: Number, required: true },
  score: { type: Number, required: true },
});

const UserModel = mongoose.model("User", usersSchema);

module.exports.UserModel = UserModel;
