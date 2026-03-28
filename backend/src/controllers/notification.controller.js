import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { notificationQueue } from "../queues/notification.queue.js";

export const sendNotification = asyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    throw new ApiError(400, "All fields are required");
  }

  // Push job to queue instead of sending email
  await notificationQueue.add("sendEmail", {
    email,
    subject,
    message,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Notification queued successfully"));
});