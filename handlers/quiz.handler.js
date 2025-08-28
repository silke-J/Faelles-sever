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

// Get quiz by id
export const getQuizById = async (id) => {
  try {
    const quiz = await quizModel
      .findById(id)
      .populate("user", "answers correctAnswersCount");
    return quiz;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl:", error);
  }
};

/* Forståelse af populate() */
/* populate() er en method fra Mongoose som gør at man kan slå data op på tværs af scripts.
  F.eks. hvis et adItem har et user-felt (ObjectId), kan man bruge .populate("user") 
  til automatisk at hente brugerens navn, email, address, osv. i samme query,
  uden at man skal lave flere databasekald. */
