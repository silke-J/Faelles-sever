/* TEst branches */
import express from "express";
import multer from "multer";
import {
  createQuiz,
  getQuizById,
  getAllQuizzes,
} from "../handlers/quiz.handler.js";
import mongoose from "mongoose";

const quizRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Get all Quizzes
quizRoute.get("/quiz", async (req, res) => {
  try {
    const quizzes = await getAllQuizzes();
    return res.status(200).send({
      status: "ok",
      data: quizzes,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// Get Quiz by id
quizRoute.get("/quiz/:id", async (req, res) => {
  try {
    const quiz = await getQuizById(req.params.id);

    return res.status(200).send({
      status: "ok",
      data: quiz,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// Create Quiz
quizRoute.post("/quiz", upload.single("image"), async (req, res) => {
  try {
    let { question, options, correctAnswer, correctOptionId, image } = req.body;

    // Opret options med id'er til quiz
    const optionDocs = options.map((t) => ({
      _id: new mongoose.Types.ObjectId(),
      text: String(t).trim(),
      votes: 0,
    }));

    // Accepter både optionId og tekst
    let correctId = correctOptionId;

    if (!correctId && correctAnswer) {
      const needle = String(correctAnswer).trim().toLowerCase();
      const hit = optionDocs.find((o) => o.text.toLowerCase() === needle);
      if (hit) correctId = hit._id;
    }

    if (!correctId) {
      return res.status(400).send({
        message:
          "Angiv enten correctOptionId eller en correctAnswer, der matcher en option.",
      });
    }

    // Opret quiz med options
    const quiz = await createQuiz({
      question: String(question).trim(),
      options: optionDocs,
      correctOptionId: correctId,
      ...(image ? { image } : {}),
    });

    return res.status(201).send({ status: "ok", data: quiz });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// Denne check-route er måske ikke længere så nødvendig pga den nye answer logik

// Check if answer is correct
/* quizRoute.post("/quiz/:id/check", async (req, res) => {
  try {
    const { chosenAnswer } = req.body;
    const result = await checkAnswer(req.params.id, chosenAnswer);

    return res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    console.error("Server-fejl:", error);
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}); */

export default quizRoute;
