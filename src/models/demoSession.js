import { Schema, model } from "mongoose";

const AdmissionSchema = new Schema({
  demoId: {
    type: String,
    unique: true,
    default: 0,
  },
  demoTopic: {
    type: String,
    require: [true, "Topic Required"],
  },
  demoTrainer: {
    type: String,
    require: [true, "Trainer Name Required"],
  },
  demoNumberOfStudents: {
    type: String,
    match: /^[0-9]+$/,
  },
});
