import express from "express";
import { addQuestionAnswer } from "../controllers/userController/answer/addQuestionAnswer";
import { profile } from "../controllers/userController/profile";
import { addQuestion } from "../controllers/userController/question/addQuestion";
import { addTraining } from "../controllers/userController/training/addTraining";
import { deleteTraining } from "../controllers/userController/training/deleteTraining";
import { editTraining } from "../controllers/userController/training/editTraining";
import { getAllTrainings } from "../controllers/userController/training/getAllTrainings";
import { getOneTraining } from "../controllers/userController/training/getOneTraining";
import { addQuestionAnswerValidation } from "../middleware/validation/addQuestionAnswerValidation";
import { addQuestionValidation } from "../middleware/validation/addQuestionValidation";
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

userRouter.get("/user/get-all-trainings", getAllTrainings);
userRouter.get("/user/get-one-training", getOneTraining);
userRouter.delete("/user/delete-training", deleteTraining);
userRouter.post("/user/add-question", addQuestionValidation, addQuestion);
userRouter.post(
  "/user/add-question-answer",
  addQuestionAnswerValidation,
  addQuestionAnswer
);

export default userRouter;
