import express from "express";
import { profile } from "../controllers/userController/profile";
import { verifyToken } from "../middleware/verifyToken";

// Middleware imports here

// Urlencoded
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// authorized routes
userRouter.use(verifyToken);
userRouter.post("/profile", profile);

export default userRouter;
