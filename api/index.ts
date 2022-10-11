import dotenv from "dotenv";
import express from "express";
import router from "./routes/router";

dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(router);

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port} - ${DATABASE_URL}`
  );
});
