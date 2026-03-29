import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

export const failedQueue = new Queue("failedQueue", {
  connection: redisConnection,
});