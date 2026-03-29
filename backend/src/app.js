import express from "express";
import routes from "./routes/notification.routes.js";
import bullBoard from "./bullBoard.js";

const app = express();

app.use(express.json());


app.use("/api", routes);


app.use("/admin/queues", bullBoard.getRouter());

export default app;