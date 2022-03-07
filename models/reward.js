const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  serviceRewardTotal: {
    type: Number,
    required: true,
  },
  serviceRewardFormula: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("reward", serviceSchema);
