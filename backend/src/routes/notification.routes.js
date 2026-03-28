import Router from 'express'
import { sendNotification } from "../controllers/notification.controller.js";

const router = Router();

router.route("/").post(sendNotification);

export default router;