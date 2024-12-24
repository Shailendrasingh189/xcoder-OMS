import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/connectDB.js";

const startServer = async () => {
  try {
    await connectDB();
    const port = config.port || 3000;

    app.listen(port, () => [console.log(`Server is Running on Port: ${port}`)]);

    process.on("unhandledRejection", (reason, promise) => {
      console.log("Unhandled Rejection at:", promise, "reason:", reason);

      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
  }
};

startServer();
