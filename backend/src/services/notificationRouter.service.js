import { sendEmail } from "./email.service.js";
import { sendSMS } from "./sms.service.js";
import { sendWhatsApp } from "./whatsapp.service.js";

export const handleNotification = async (data) => {
  const { type, recipient, subject, message } = data;

  switch (type) {
    case "email":
      return await sendEmail(recipient, subject, message);

    case "sms":
      return await sendSMS(recipient, message);

    case "whatsapp":
      return await sendWhatsApp(recipient, message);

    default:
      throw new Error("Invalid type");
  }
};