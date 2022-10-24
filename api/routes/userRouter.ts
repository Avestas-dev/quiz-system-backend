import express from "express";
import { profile } from "../controllers/userController/profile";
import { addTraining } from "../controllers/userController/training/addTraining";
import { editTraining } from "../controllers/userController/training/editTraining";
import { addTrainingValidation } from "../middleware/validation/addTrainingValidation";
import { editTrainingValidation } from "../middleware/validation/editTrainingValidation";
import { verifyToken } from "../middleware/verifyToken";

// Middleware imports here

// Urlencoded
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// authorized routes
userRouter.use(verifyToken);
userRouter.post("/user/profile", profile);
userRouter.post("/user/add-training", addTrainingValidation, addTraining);
userRouter.put(
  "/user/edit-training",
  addTrainingValidation,
  editTrainingValidation,
  editTraining
);

export default userRouter;
