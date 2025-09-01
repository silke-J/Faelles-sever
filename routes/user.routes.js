import express from "express";
import {
  createUser,
  getUserById,
  answerQuizQuestion,
  getUsers,
} from "../handlers/user.handler.js";

const userRoute = express.Router();

// Get all users
userRoute.get("/users", async (req, res) => {
  try {
    const result = await getUsers();

    if (result.status === "ok") {
      return res.status(200).send(result);
    }

    return res.status(500).send(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

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

// I stedet for denne, er der oprettet en answer model/route/handler for at splitte koden og logikken lidt mere op

// Answered quiz-question
// userRoute.put("/user/:id/answer", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { quiz, chosenAnswer } = req.body;
//     const result = await answerQuizQuestion(req.params.id, quiz, chosenAnswer);

//     return res.status(200).send({
//       status: "ok",
//       message: "Svar gemt",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Server-fejl", error);
//     return res.status(500).send({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

export default userRoute;
