const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  answers: [{ type: Number, required: true }],
});

module.exports = mongoose.model("Answer", answerSchema);
