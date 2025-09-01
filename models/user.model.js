import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const userSchema = new Schema({
  name: { type: String, required: true },
  // Opdateres når en bruger har besvaret en quiz korrekt
  correctAnswersCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
