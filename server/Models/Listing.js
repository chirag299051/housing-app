const mongoose = require("mongoose");

const Listing = new mongoose.Schema({
  name: { type: String },
  city: { type: String },
  price: { type: Number },
  moveIn: { type: String },
  address: { type: String },
  bed: { type: Number },
  bath: { type: Number },
  type: { type: String },
  postedBy: { type: String },
  img: { type: String },
});

module.exports = mongoose.model("Listing", Listing);
