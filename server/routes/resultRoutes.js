const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Answer = require("../models/Answer");
const Question = require("../models/Questions");
const auth = require("../middleware/authMiddleware");

// Calculate score
router.post("/:testId", auth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const testId = req.params.testId;

    const answerDoc = await Answer.findOne({ studentId, testId });
    const questions = await Question.find({ testId });

    if (!answerDoc) return res.status(404).json({ message: "No answers found" });

    let score = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswer === answerDoc.answers[index]) {
        score++;
      }
    });

    const result = new Result({
      studentId,
      testId,
      score,
      total: questions.length,
    });

    await result.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
