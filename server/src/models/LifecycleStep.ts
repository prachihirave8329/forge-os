import mongoose, { Schema } from "mongoose";

const lifecycleStepSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    phase: {
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
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "LifecycleStep",
  lifecycleStepSchema
);