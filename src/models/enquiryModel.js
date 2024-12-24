import { Schema, model } from "mongoose";

const EnquirySchema = new Schema(
  {
    enquiryId: {
      type: String,
      unique: true,
      default: "XCE",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    message: {
      type: String,
      required: [true, "Message is required."],
    },
    courseInterest: {
      type: String,
      required: [true, "Course interest is required."],
    },
    status: {
      type: String,
      enum: ["Pending", "Demo", "Converted"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Enquiry = model("Enquiry", EnquirySchema);

export { Enquiry };
