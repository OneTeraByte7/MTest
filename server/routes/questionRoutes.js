const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Fetch jumbled questions
router.get("/:testId", auth, async (req, res) => {
  try {
    let questions = await Question.find({ testId: req.params.testId });
    questions = questions.sort(() => Math.random() - 0.5); // shuffle
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add question (Admin only)
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const { testId, questionText, options, correctAnswer } = req.body;
    const question = new Question({ testId, questionText, options, correctAnswer });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
