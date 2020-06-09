const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driversdlSchema = new Schema({
  categoryId: {
    type: String,
    required: true,
  },
  driverId: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("mySchema", driversdlSchema);