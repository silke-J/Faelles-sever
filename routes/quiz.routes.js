import express from "express";
import multer from "multer";
import { createQuiz, getQuizById } from "../handlers/quiz.handler.js";
import quizModel from "../models/quiz.model.js";

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

// Post Create Quiz
quizRoute.post("/quiz", upload.single("image"), async (req, res) => {
  try {
    const { question, options, correctAnswer, nextHint } = req.body;

    const quiz = {
      question,
      options,
      correctAnswer,
      nextHint,
    };

    if (req.file) {
      quiz.image = process.env.SERVER_HOST + "/quiz/" + req.file.filename;
    }

    const result = await createQuiz(quiz);

    return res.status(201).send({
      status: "Oprettet",
      message: "Quiz oprettet",
      data: result,
    });
  } catch (error) {
    console.error("Server-fejl:", error);
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

export default quizRoute;
