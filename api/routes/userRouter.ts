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
import { addQuestionAnswerValidation } from "../middleware/validation/answer/addQuestionAnswerValidation";
import { addQuestionWithAnswersValidation } from "../middleware/validation/answer/addQuestionWithAnswersValidation";
import { editQuestionAnswerValidation } from "../middleware/validation/answer/editQuestionAnswerValidation";
import { addQuestionValidation } from "../middleware/validation/question/addQuestionValidation";
import { editQuestionValidation } from "../middleware/validation/question/editQuestionValidation";
import { addTrainingValidation } from "../middleware/validation/training/addTrainingValidation";
import { editTrainingValidation } from "../middleware/validation/training/editTrainingValidation";
import { verifyToken } from "../middleware/verifyToken";

// Middleware imports here

// Urlencoded
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// authorized routes
userRouter.use(verifyToken);

userRouter.get("/training/all", getAllTrainings);
userRouter.get("/training", getOneTraining);
userRouter.get("/question/all", getQuestions);
userRouter.get("/question", getQuestion);

userRouter.delete("/training", deleteTraining);
userRouter.delete("/question-answer", deleteQuestionAnswer);
userRouter.delete("/question", deleteQuestion);

userRouter.post("/question", addQuestionValidation, addQuestion);
userRouter.post(
  "/question/with-answers",
  addQuestionWithAnswersValidation,
  addQuestionWithAnswers
);
userRouter.post(
  "/question-answer",
  addQuestionAnswerValidation,
  addQuestionAnswer
);
userRouter.post("/training", addTrainingValidation, addTraining);
userRouter.post("/user/profile", profile);

userRouter.put("/question", editQuestionValidation, editQuestion);
userRouter.put(
  "/question-answer",
  editQuestionAnswerValidation,
  editQuestionAnswer
);
userRouter.put(
  "/training",
  addTrainingValidation,
  editTrainingValidation,
  editTraining
);

export default userRouter;
