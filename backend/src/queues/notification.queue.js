import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

export const notificationQueue = new Queue("notificationQueue", {
  connection: redisConnection,
});