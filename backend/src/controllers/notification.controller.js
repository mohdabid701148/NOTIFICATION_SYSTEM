import { notificationQueue } from "../queues/notification.queue.js";
import Notification from "../models/notification.model.js";

export const sendNotification = async (req, res, next) => {
  try {
    const { type, recipient, subject, message } = req.body;

    if (!type || !recipient || !message) {
      return res.status(400).json({
        success: false,
        message: "type, recipient and message are required",
      });
    }

    const allowedTypes = ["email", "sms", "push"];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification type",
      });
    }

    if (type === "email" && !subject) {
      return res.status(400).json({
        success: false,
        message: "Subject is required for email notifications",
      });
    }

    const job = await notificationQueue.add(
      "sendNotification",
      {
        type,
        recipient,
        subject,
        message,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      }
    );

    await Notification.create({
      type,
      recipient,
      subject,
      message,
      jobId: job.id,
      status: "queued",
    });

    return res.status(202).json({
      success: true,
      message: "Notification queued successfully",
      data: {
        jobId: job.id,
      },
    });
  } catch (error) {
    next(error);
  }
};