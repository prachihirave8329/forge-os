import mongoose, { Schema } from "mongoose";
const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    lifecyclePhase: {
      type: String,
      enum: [
        "Planning",
  "Analysis",
  "Design",
  "Development",
  "Testing",
  "Deployment",
  "Maintenance",
      ],
      default: "Planning",
    },

    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);