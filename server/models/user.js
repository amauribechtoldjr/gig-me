const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const id = mongoose.SchemaTypes.ObjectId;

const userSchema = new Schema({
  name: String,
  admin: Boolean
});

module.exports = mongoose.model("User", userSchema);
