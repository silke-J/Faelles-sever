import express from "express";
import {
  createUser,
  getUserById,
  answerQuizQuestion,
} from "../handlers/user.handler.js";

const userRoute = express.Router();

// Get User by id
userRoute.get("/user/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    return res.status(200).send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// Create User
userRoute.post("/user", async (req, res) => {
  try {
    const { name } = req.body;

    const result = await createUser({ name });

    return res.status(201).send({
      status: "Oprettet",
      message: "User oprettet",
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

// Answered quiz-question
userRoute.post("/user/:id/answer", async (req, res) => {
  try {
    const { questionId, chosenAnswer } = req.body;
    const result = await answerQuizQuestion(
      req.params.id,
      questionId,
      chosenAnswer
    );

    return res.status(200).send({
      status: "ok",
      message: "Svar gemt",
      data: result,
    });
  } catch (error) {
    console.error("Server-fejl", error);
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

export default userRoute;
