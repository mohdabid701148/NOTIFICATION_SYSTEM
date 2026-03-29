import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import { handleNotification } from "../services/notificationRouter.service.js";
import Notification from "../models/notification.model.js";
import { failedQueue } from "../queues/failed.queue.js";
import db_connect from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
db_connect();

const worker = new Worker(
  "notificationQueue",
  async (job) => {
    console.log("Job received:", job.id, job.data);

    await Notification.findOneAndUpdate(
      { jobId: job.id },
      { status: "processing" }
    );

    try {
      await handleNotification(job.data);

      console.log("Notification sent");

      await Notification.findOneAndUpdate(
        { jobId: job.id },
        { status: "sent" }
      );
    } catch (err) {
      console.log("Error:", err.message);

      await Notification.findOneAndUpdate(
        { jobId: job.id },
        {
          status: "failed",
          error: err.message,
          attempts: job.attemptsMade,
        }
      );

      if (job.attemptsMade >= 3) {
        await failedQueue.add("dead", job.data);
      }

      throw err;
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,

    limiter: {
      max: 10,
      duration: 1000,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}`);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});