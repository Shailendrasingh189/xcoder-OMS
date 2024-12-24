import { Enquiry } from "../models/enquiryModel.js";
import ExpressErrorHandler from "../middleware/ExpressErrorHandler.js";

// Create a new enquiry
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message, courseInterest, status } = req.body;

    // Validations
    if (!name || !email || !phone || !message || !courseInterest) {
      return next(
        new ExpressErrorHandler(
          400,
          "Name, Email, Phone, Message, and Course Interest are required."
        )
      );
    }

    // Check for duplicate enquiries
    const existingEnquiry = await Enquiry.findOne({ email });
    if (existingEnquiry) {
      return next(new ExpressErrorHandler(400, "This enquiry already exists."));
    }

    // Generate enquiryId
    const counter = await Enquiry.countDocuments();
    console.log(counter);
    const enquiryId = `XCE${String(counter + 1).padStart(3, "0")}`;

    console.log(enquiryId);

    const enquiry = await Enquiry.create({
      enquiryId,
      name,
      email,
      phone,
      message,
      courseInterest,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry created successfully.",
      enquiry,
    });
  } catch (error) {
    next(new ExpressErrorHandler(500, "Error creating enquiry.", error));
  }
};

// Get all enquiries
const getAllEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    next(new ExpressErrorHandler(500, "Error fetching enquiries.", error));
  }
};

// Get an enquiry by ID
const getEnquiryById = async (req, res, next) => {
  const { enquiryId } = req.params;

  try {
    const enquiry = await Enquiry.findById(enquiryId);
    console.log(enquiry);
    if (!enquiry) {
      return next(
        new ExpressErrorHandler(404, `Enquiry with ID ${enquiryId} not found.`)
      );
    }

    res.status(200).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    next(new ExpressErrorHandler(500, "Error fetching enquiry.", error));
  }
};

// Update an enquiry
const updateEnquiry = async (req, res, next) => {
  const { enquiryId } = req.params;
  const updates = req.body;

  try {
    const enquiry = await Enquiry.findByIDAndUpdate({ enquiryId }, updates, {
      new: true,
    });

    if (!enquiry) {
      return next(
        new ExpressErrorHandler(404, `Enquiry with ID ${enquiryId} not found.`)
      );
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully.",
      enquiry,
    });
  } catch (error) {
    next(new ExpressErrorHandler(500, "Error updating enquiry.", error));
  }
};

// Delete an enquiry
const deleteEnquiry = async (req, res, next) => {
  const { enquiryId } = req.params;

  try {
    const enquiry = await Enquiry.findByIdAndDelete(enquiryId);
    if (!enquiry) {
      return next(
        new ExpressErrorHandler(404, `Enquiry with ID ${enquiryId} not found.`)
      );
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully.",
      enquiry,
    });
  } catch (error) {
    next(new ExpressErrorHandler(500, "Error deleting enquiry.", error));
  }
};

export {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
