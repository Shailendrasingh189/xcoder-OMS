import { mongoose } from "mongoose";

// const mongodbUrl =
//   process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/xcoder";

const mongodbUrl = process.env.MONGODB_URL;
console.log(mongodbUrl);

const connectDB = async () => {
  try {
    mongoose.connect(mongodbUrl);
    console.log("Database is connected Successfully.");
  } catch (error) {
    console.log(`Database connection error`, error);
    process.exit(1);
  }
};

export default connectDB;
