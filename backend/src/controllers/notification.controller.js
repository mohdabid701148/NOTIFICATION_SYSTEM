import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { sendEmail } from "../services/email.service.js";

const sendNotification = asyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    throw new ApiError(400, "All fields are required");
  }

  await sendEmail(email, subject, message);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Notification sent successfully"));
});
export {sendNotification}