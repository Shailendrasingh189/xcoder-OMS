import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", createEnquiry); // Create a new enquiry
router.get("/", getAllEnquiries); // Get all enquiries
router.get("/:enquiryId", getEnquiryById); // Get an enquiry by ID
router.put("/:enquiryId", updateEnquiry); // Update an enquiry by ID
router.delete("/:enquiryId", deleteEnquiry); // Delete

export default router;
