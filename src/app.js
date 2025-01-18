import express from "express";
import cors from "cors";
import ExpressErrorHandler from "./middleware/ExpressErrorHandler.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import enquiryRouter from "./routes/enquiryRouter.js";
import trainerRouter from "./routes/trainerRouter.js";
import courseRouter from "./courseFolder/router.js"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      message: "Welcome to X-coders IT",
    });
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/dashboard", dashboardRouter);
app.use("/api/enquiry", enquiryRouter);
app.use("/api/trainer", trainerRouter);
app.use("/api/courses", courseRouter);

app.all("*", (req, res, next) => {
  next(new ExpressErrorHandler(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ message });
});

console.log("ram");
export default app;
