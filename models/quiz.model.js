import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const quizSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  nextHint: { type: String },
  image: { type: String },
});

export default mongoose.models.quiz || mongoose.model("quiz", quizSchema);
