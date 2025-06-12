const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    testId: {type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true},
    questionText: {type: String, required: true},
    options: [{ type: String, required: true}],
    correctAnswer: { type: String, required: true},
    order: {type: Number, default: 0},
});

module.exports = mongoose.model("Question", questionSchema);