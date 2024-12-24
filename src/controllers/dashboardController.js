import { Enquiry } from "../models/enquiryModel.js";
import { Trainer } from "../models/trainerModel.js";
import { Admission } from "../models/admissionModel.js";
import ExpressErrorHandler from "../middleware/ExpressErrorHandler.js";

const getDashboardStats = async (req, res, next) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const totalEnquiries = await Enquiry.countDocuments();

    const todayEnquiries = await Enquiry.countDocuments({
      createdAt: { $gte: startOfToday },
    });

    const totalTrainers = await Trainer.countDocuments();

    const totalAdmissions = await Admission.countDocuments();

    const todayAdmissions = await Admission.countDocuments({
      createdAt: { $gte: startOfToday },
    });

    const demoSessions = await Enquiry.countDocuments({ status: "Demo" });

    res.status(200).json({
      success: true,
      stats: {
        totalEnquiries,
        todayEnquiries,
        totalTrainers,
        totalAdmissions,
        todayAdmissions,
        demoSessions,
      },
    });
  } catch (error) {
    next(
      new ExpressErrorHandler(500, "Error fetching dashboard statistics.", error)
    );
  }
};

export { getDashboardStats };
