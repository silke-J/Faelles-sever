import quizModel from "../models/quiz.model.js";

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
