import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);