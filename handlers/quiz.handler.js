import quizModel from "../models/quiz.model.js";

// Get all Quizzes
export const getAllQuizzes = async () => {
  try {
    const quizzes = await quizModel.find();
    return quizzes;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error);
  }
};

// Get Quiz by id
export const getQuizById = async (id) => {
  try {
    const quiz = await quizModel.findById(id);
    return quiz;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl:", error);
  }
};

// Create Quiz
export const createQuiz = async (body) => {
  try {
    const quiz = await quizModel.create(body);
    return quiz;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error);
  }
};

// Check if answer is correct
export const checkAnswer = async (quizId, choosenAnswer) => {
  try {
    const quiz = await quizModel.findById(quizId);
    if (!quiz) throw new Error("Quiz ikke fundet");

    const isCorrect = quiz.correctAnswer === choosenAnswer;
    return { isCorrect, correctAnswer: quiz.correctAnswer };
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error);
  }
};
