const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }], // Reference to Device model
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }
  console.log("saving....");

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("saved hashed password", this.password);
  next();
});

//Methods for creating a token
userSchema.methods.createToken = function () {
  const token = jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};

// Method to compare passwords
userSchema.methods.isMatch = async function (reqPassword) {
  console.log("Hashed password in DB:", this.password);
  console.log("Request password:", reqPassword);

  const isCorrect = await bcrypt.compare(reqPassword, this.password);
  console.log("Password match result:", isCorrect);

  return isCorrect;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
