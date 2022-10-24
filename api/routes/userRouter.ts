import express from "express";
import { profile } from "../controllers/userController/profile";
import { addTraining } from "../controllers/userController/training/addTraining";
import { verifyToken } from "../middleware/verifyToken";

// Middleware imports here

// Urlencoded
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// authorized routes
userRouter.use(verifyToken);
userRouter.post("/user/profile", profile);
userRouter.post("/user/add-training", addTraining);

export default userRouter;
