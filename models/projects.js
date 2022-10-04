const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: Number, required: true },
  timeLine: {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
});
module.exports = mongoose.model("projects", ProjectSchema);
