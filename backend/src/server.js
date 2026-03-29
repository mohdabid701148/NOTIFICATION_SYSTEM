
import dotenv from "dotenv";
import app from "./app.js";
import db_connect from "./config/db.js";

dotenv.config();

await db_connect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});