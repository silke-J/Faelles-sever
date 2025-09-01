import mongoose, { Schema } from "mongoose";

// Answer model der sørger for at hver bruger skriver sit eget Answer-doc i stedet for at alle opdaterer samme quiz-doc samtidig.
const answerSchema = new Schema(
  {
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "quiz",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    optionId: { type: Schema.Types.ObjectId, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Bruger kan kun have ét svar pr quiz
answerSchema.index({ quiz: 1, user: 1 }, { unique: true });

export default mongoose.models.answer || mongoose.model("answer", answerSchema);
