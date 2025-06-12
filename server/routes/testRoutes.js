const express = require("express");
const router = express.Router();
const Test = require("../models/Test");
const Question = require("../models/Questions");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/upload", authMiddleware, roleMiddleware, roleMiddleware("admin"),async (req, res) => {
    try{
        const { title, description, question, questions } = req.body;

        if(!title || !questions || !Array.isArray(question) || questions.length === 0) {
            return res.status(400).json({message: "Title ans questions array are required. "});
        }

        const test = new Test({
            title,
            description,
            creadtedBy: req.userid,
        });
        await test.save();

        const questionDocs = questions.map((q, idx)  => ({
            testId: test._id,
            questionText: q.questionsText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            order: idx
        }));

        await Question.insertMany(questionDocs);
        
        res.status(201).json({message: "Test and questions uploaded successfully", testId: test._id});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = router;