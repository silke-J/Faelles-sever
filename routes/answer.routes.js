import express from "express";
import quizModel from "../models/quiz.model.js";
import userModel from "../models/user.model.js";

const answerRoute = express.Router();

// Post svaret på quizzen
answerRoute.post("/quiz/:id/answer", async (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body || {};
    const userId = req.user?._id || req.body.userId;

    if (!optionId)
      return res.status(400).send({ message: "optionId er påkrævet" });

    if (!userId)
      return res
        .status(400)
        .send({ message: "userId mangler (eller login kræves)" });

    const quiz = await quizModel.findById(id);
    if (!quiz) return res.status(404).send({ message: "Quiz ikke fundet" });

    // Hvis svaret matcher correctOptionId på quizzen, er svaret rigtigt
    const isCorrect = String(optionId) === String(quiz.correctOptionId);

    // Opdaterer votes på options i quiz-modellen
    const options = [
      quizModel.updateOne(
        { _id: id, "options._id": optionId },
        {
          // $inc øger/mindsker et tal-felt
          $inc: {
            "options.$.votes": 1,
            ...(isCorrect ? { correctCount: 1 } : {}),
          },
        }
      ),
    ];
    if (isCorrect) {
      options.push(
        userModel.updateOne(
          { _id: userId },
          { $inc: { correctAnswersCount: 1 } }
        )
      );
    }

    // Opdaterer data sideløbende med andre igangværende funktioner
    await Promise.all(options);

    return res.send({ status: "ok", isCorrect });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: "Internal server error" });
  }
});

export default answerRoute;
