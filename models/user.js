const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: "string", required: true },
  name: { type: "string", required: true },
  password: { type: "string", required: true },
  userType: { type: "string", enum: ["admin", "user"], required: true },
});

module.exports = mongoose.model("user", UserSchema);
