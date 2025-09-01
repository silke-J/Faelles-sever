import mongoose, { Schema } from "mongoose";

// Options til quiz
const optionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  text: { type: String, required: true, trim: true },
  // Antal brugere der har svaret med denne mulighed
  votes: { type: Number, default: 0 },
});

const quizSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    options: {
      type: [optionSchema],
    },
    correctOptionId: { type: Schema.Types.ObjectId, required: true },
    correctCount: { type: Number, default: 0 },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.quiz || mongoose.model("quiz", quizSchema);
