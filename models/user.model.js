import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const userSchema = new Schema({
  name: { type: String, required: true },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
      },
      chosenAnswer: { type: String, required: true },
      correct: { type: Boolean, required: true },
    },
  ],
  correctAnswersCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
