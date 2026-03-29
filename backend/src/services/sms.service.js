export const sendSMS = async (to, message) => {
  console.log("📱 SMS:", to, message);
  return { success: true };
};