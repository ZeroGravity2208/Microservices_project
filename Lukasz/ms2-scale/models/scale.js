const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scaleSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },
  minPenaltyPoints: {
    type: Number,
    required: true,
  },
  maxPenaltyPoints: {
    type: Number,
    required: true,
  },
  minFine: {
    type: Number,
    required: true,
  },
  maxFine: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("scale", scaleSchema);
