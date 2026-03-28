import dotenv from "dotenv";
import path from "path";

// 🔥 Load environment variables (VERY IMPORTANT)
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import { sendEmail } from "../services/email.service.js";

// 🔥 Create worker
const worker = new Worker(
  "notificationQueue",
  async (job) => {
    try {
      const { email, subject, message } = job.data;

      console.log("Processing job:", job.id);

      // Call email service
      await sendEmail(email, subject, message);

      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error("Error processing job:", error.message);
      throw error; // Important for BullMQ to mark job as failed
    }
  },
  {
    connection: redisConnection,
  }
);

// ✅ Success event
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

// ❌ Failure event
worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}`);
});

// Optional: log worker errors
worker.on("error", (err) => {
  console.error("Worker error:", err);
});