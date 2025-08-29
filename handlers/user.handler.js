import userModel from "../models/user.model.js";
import quizModel from "../models/quiz.model.js";

// Create user
export const createUser = async (body) => {
  try {
    const user = await userModel.create(body);
    return user;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error);
  }
};

// Tilføj svar på et quiz-spørgsmå
export const addAnswer = async (req, res) => {
  try {
    const { userId } = req.params;
    const { questionId, chosenAnswer } = req.body;

    const quizQuestion = await Quiz.findById(questionId);
    if (!quizQuestion) {
      return res.status(404).json({ message: "Spørgsmål ikke fundet" });
    }

    const isCorrect = quizQuestion.correctAnswer === chosenAnswer;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          answers: {
            questionId,
            chosenAnswer,
            correct: isCorrect,
          },
        },
        $inc: { correctAnswersCount: isCorrect ? 1 : 0 },
      },
      { new: true }
    ).populate("answers.questionId"); // populater quiz spørgsmål

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hent en bruger med quiz-svar
export const getUserWithAnswers = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("answers.questionId");
    if (!user) return res.status(404).json({ message: "Bruger ikke fundet" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
