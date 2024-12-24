import { Schema, model } from "mongoose";

const TrainerSchema = new Schema(
  {
    trainerId: {
      type: String,
      unique: true,
      default: "XCT",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "email is required."],
    },
    techStack: {
      type: String,
      required: [
        true,
        "Tech Stack is required, like MERN, MEAN, JAVA Spring boot etc.",
      ],
    },
    course: {
      type: String,
      required: true,
    },
    timing: {
      type: Date,
    },
    timeDuration: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Trainer = model("Trainer", TrainerSchema);

export { Trainer };
