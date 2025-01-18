import { Trainer } from "../models/trainerModel.js";
import ExpressErrorHandler from "../middleware/ExpressErrorHandler.js";

const createTrainer = async (req, res, next) => {
  try {
    const { name, email, techStack, course, timing, timeDuration } = req.body;

    // validations
    if (!name || !email || !techStack || !course) {
      return `Name, Email, Tech Stack Must Be Required.`;
    }

    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      return res.status(400).json({
        success: true,
        message: "This trainer already exists.",
      });
    }

    // Get the next sequence for trainerId
    const counter = await Trainer.countDocuments();

    const trainerId = `XCT${String(counter + 1).padStart(3, "0")}`;

    const trainer = await Trainer.create({
      trainerId,
      name,
      email,
      techStack,
      course,
      timing,
      timeDuration,
    });

    return res.status(201).json({
      message: "Trainer Created Successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    return next(
      new ExpressErrorHandler(500, "Error when creating new trainer.", error)
    );
  }
};

const getAllTrainers = async (req, res, next) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({
      success: true,
      trainers,
    });
  } catch (error) {
    next(
      new ExpressErrorHandler(
        500,
        "Error Occurs on fetching trainers data.",
        error
      )
    );
  }
};

const getTrainerById = async (req, res, next) => {
  const { trainerId } = req.params;
  try {
    const trainer = await Trainer.findById(trainerId);
    console.log(trainer, trainerId);
    if (!trainer) {
      return res.status(400).json({
        success: true,
        message: "Trainer ID not found.",
      });
    }

    res.status(200).json({
      success: true,
      trainer,
    });
  } catch (error) {
    next(new ExpressErrorHandler(500, "Error fetching trainer.", error));
  }
};

const updateTrainer = async (req, res, next) => {
  const { trainerId } = req.params;
  const updates = req.body;

  try {
    const trainer = await Trainer.findOneAndUpdate({ trainerId }, updates, {
      new: true,
    });

    if (!trainer) {
      return  res.status(400).json({
        success: true,
        message: "Trainer ID not found.",
      });
    }

    res.status(200).json({
      message: "Trainer updated successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    next(new ExpressErrorHandler(500, "Error updating trainer.", error));
  }
};

const deleteTrainer = async (req, res, next) => {
  const { trainerId } = req.params;

  try {
    const trainer = await Trainer.findOneAndDelete(trainerId);
    if (!trainer) {
      return  res.status(400).json({
        success: true,
        message: "Trainer ID not found.",
      });
    }

    res.status(200).json({
      message: "Trainer deleted successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    next(new ExpressErrorHandler(500, "Error deleting trainer.", error));
  }
};

export {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};
