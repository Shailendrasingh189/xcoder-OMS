import { Schema, model } from "mongoose";

const DemoSchema = new Schema({
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

const Demo = model("demo", DemoSchema);

export default Demo;
