import express from "express";
import { addQuestionAnswer } from "../controllers/userController/answer/addQuestionAnswer";
import { deleteQuestionAnswer } from "../controllers/userController/answer/deleteQuestionAnswer";
import { editQuestionAnswer } from "../controllers/userController/answer/editQuestionAnswer";
import { profile } from "../controllers/userController/profile";
import { addQuestion } from "../controllers/userController/question/addQuestion";
import { addQuestionWithAnswers } from "../controllers/userController/question/addQuestionWithAnswers";
import { deleteQuestion } from "../controllers/userController/question/deleteQuestion";
import { editQuestion } from "../controllers/userController/question/editQuestion";
import { getQuestion } from "../controllers/userController/question/getQuestion";
import { getQuestions } from "../controllers/userController/question/getQuestions";
import { addTraining } from "../controllers/userController/training/addTraining";
import { deleteTraining } from "../controllers/userController/training/deleteTraining";
import { editTraining } from "../controllers/userController/training/editTraining";
import { getAllTrainings } from "../controllers/userController/training/getAllTrainings";
import { getOneTraining } from "../controllers/userController/training/getOneTraining";
import { addQuestionAnswerValidation } from "../middleware/validation/addQuestionAnswerValidation";
import { addQuestionValidation } from "../middleware/validation/addQuestionValidation";
import { addQuestionWithAnswersValidation } from "../middleware/validation/addQuestionWithAnswersValidation";
import { addTrainingValidation } from "../middleware/validation/addTrainingValidation";
import { editQuestionAnswerValidation } from "../middleware/validation/editQuestionAnswerValidation";
import { editQuestionValidation } from "../middleware/validation/editQuestionValidation";
import { editTrainingValidation } from "../middleware/validation/editTrainingValidation";
import { verifyToken } from "../middleware/verifyToken";

// Middleware imports here

// Urlencoded
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// authorized routes
userRouter.use(verifyToken);

userRouter.get("/user/get-all-trainings", getAllTrainings);
userRouter.get("/user/get-one-training", getOneTraining);
userRouter.get("/user/get-questions", getQuestions);
userRouter.get("/user/get-question", getQuestion);

userRouter.delete("/user/delete-training", deleteTraining);
userRouter.delete("/user/delete-question-answer", deleteQuestionAnswer);
userRouter.delete("/user/delete-question", deleteQuestion);

userRouter.post("/user/add-question", addQuestionValidation, addQuestion);
userRouter.post(
  "/user/add-question-with-answers",
  addQuestionWithAnswersValidation,
  addQuestionWithAnswers
);
userRouter.post(
  "/user/add-question-answer",
  addQuestionAnswerValidation,
  addQuestionAnswer
);
userRouter.post("/user/add-training", addTrainingValidation, addTraining);
userRouter.post("/user/profile", profile);

userRouter.put("/user/edit-question", editQuestionValidation, editQuestion);
userRouter.put(
  "/user/edit-question-answer",
  editQuestionAnswerValidation,
  editQuestionAnswer
);
userRouter.put(
  "/user/edit-training",
  addTrainingValidation,
  editTrainingValidation,
  editTraining
);

export default userRouter;
