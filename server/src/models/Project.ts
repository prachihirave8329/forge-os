import mongoose, { Schema } from "mongoose";

const lifecycleStepSchema = new Schema(
  {
    phase: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

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
        "Coding",
        "Testing",
        "Deployment",
        "Maintenance",
      ],
      default: "Planning",
    },

    lifecycleSteps: [lifecycleStepSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);