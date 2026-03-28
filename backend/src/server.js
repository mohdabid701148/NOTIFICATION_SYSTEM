import express from "express";
import dotenv from "dotenv";
import notificationRoutes from "./routes/notification.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/notify", notificationRoutes);

// Error middleware (always last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
