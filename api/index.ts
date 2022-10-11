import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port} - ${DATABASE_URL}`
  );
});
