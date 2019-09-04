const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agencySchema = new Schema({
  name: String,
  contact: String
});

module.exports = mongoose.model("Agency", agencySchema);
