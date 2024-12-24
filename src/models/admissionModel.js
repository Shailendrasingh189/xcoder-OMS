import { Schema, model } from "mongoose";

const AdmissionSchema = new Schema(
  {
    admissionId: {
      type: String,
      unique: true,
      default: "XCA",
    },
    studentName: {
      type: String,
      required: [true, "Student Name is required."],
    },
    studentEmail: {
      type: String,
      required: [true, "Email is required."],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    studentPhone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    courseEnrolled: {
      type: String,
      required: [true, "Course enrolled is required."],
    },
    admissionDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Admission = model("Admission", AdmissionSchema);

export { Admission };
