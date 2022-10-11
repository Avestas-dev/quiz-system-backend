import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server sss is running at http://localhost:${port}`);
});
