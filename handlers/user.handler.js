import userModel from "../models/user.model.js";
import quizModel from "../models/quiz.model.js";

// Get users
export const getUsers = async () => {
  try {
    const users = await userModel.find({}).select("-password -__v");

    return {
      status: "ok",
      message: "Users fetched successfully",
      data: users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      status: "error",
      message: "An error occurred while fetching users",
      data: [],
      error: error.message,
    };
  }
};

// Get User by id
export const getUserById = async (id) => {
  try {
    const user = userModel.findById(id);
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

// I stedet for denne, er der oprettet en answer model/route/handler for at splitte koden og logikken lidt mere op

// // Answered quiz-question
// export const answerQuizQuestion = async (userId, quizId, chosenAnswer) => {
//   try {
//     console.log(quizId);

//     const quiz = await quizModel.findById(quizId);
//     if (!quiz) throw new Error("Quiz ikke fundet");

//     const correct = quiz.correctAnswer === chosenAnswer;

//     const user = await userModel.findById(userId);
//     if (!user) throw new Error("User ikke fundet");

//     /*  user.quiz.push({
//       quiz: quiz,
//       chosenAnswer,
//       correct,
//     }); */

//     if (correct) {
//       user.correctAnswerCount += 1;
//     }

//     await user.save();
//   } catch (error) {
//     console.error("Fejl i answerQuizQuestion", error);
//     throw error;
//   }
// };
