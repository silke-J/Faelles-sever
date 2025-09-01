import userModel from "../models/user.model.js";
import quizModel from "../models/quiz.model.js";

// Get User by id
export const getUserById = async (id) => {
  try {
    const user = userModel.findById(id).populate("answers.questionId");
    return user;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl:", error);
  }
};

// Create User
export const createUser = async (body) => {
  try {
    const user = await userModel.create(body);
    return user;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error);
  }
};

// Answered quiz-question
export const answerQuizQuestion = async (userId, quizId, chosenAnswer) => {
  try {
    console.log(quizId);

    const quiz = await quizModel.findById(quizId);
    if (!quiz) throw new Error("Quiz ikke fundet");

    const correct = quiz.correctAnswer === chosenAnswer;

    const user = await userModel.findById(userId);
    if (!user) throw new Error("User ikke fundet");

    /*  user.quiz.push({
      quiz: quiz,
      chosenAnswer,
      correct,
    }); */

    if (correct) {
      user.correctAnswerCount += 1;
    }

    await user.save();
  } catch (error) {
    console.error("Fejl i answerQuizQuestion", error);
    throw error;
  }
};
