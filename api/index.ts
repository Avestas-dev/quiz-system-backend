import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/router";

dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Cors policy
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: "*",
};
app.use(cors(corsOpts));

app.use(router);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
