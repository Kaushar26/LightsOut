const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  team: String,
  country: String,
  points: Number,
  wins: Number,
});

module.exports = mongoose.model("Driver", driverSchema);
