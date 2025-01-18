import express from "express";
import { getAllCourses, getCourseById, updateCourseById,  deleteCourseById, createCourse} from "./controller.js"

const router = express.Router();


router.route("/").get(getAllCourses).post(createCourse);

router
  .route("/:courseId")
  .get(getCourseById)
  .put(updateCourseById)
  .delete(deleteCourseById);

export default router;
