import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const userSchema = new Schema({
  name: { type: String, required: true },

  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quiz",
  },

  correctAnswersCount: {
    type: Number,
    default: 0,
  },
});

/* answers: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz",
      },
      chosenAnswer: { type: String },
      correct: { type: Boolean },
    },
  ], */

export default mongoose.models.user || mongoose.model("user", userSchema);
