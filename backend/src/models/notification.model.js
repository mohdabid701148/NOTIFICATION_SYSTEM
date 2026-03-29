import mongoose from "mongoose";

const schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["email", "sms", "whatsapp"],
    required: true,
    index: true,
  },

  recipient: {
    type: String,
    required: true,
    index: true,
  },

  subject: String,
  message: String,

  jobId: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    enum: ["queued", "processing", "sent", "failed"],
    default: "queued",
    index: true,
  },

  attempts: { type: Number, default: 0 },
  error: String,

}, { timestamps: true });

export default mongoose.model("Notification", schema);