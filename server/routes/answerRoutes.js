const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const auth = require("../middleware/authMiddleware");

// Submit answers
router.post("/:testId", auth, async (req, res) => {
  try {
    const answer = new Answer({
      studentId: req.user.id,
      testId: req.params.testId,
      answers: req.body.answers,
    });
    await answer.save();
    res.status(201).json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
