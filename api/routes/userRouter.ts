import express from "express";
import { addQuestionAnswer } from "../controllers/userController/answer/addQuestionAnswer";
import { deleteQuestionAnswer } from "../controllers/userController/answer/deleteQuestionAnswer";
import { editQuestionAnswer } from "../controllers/userController/answer/editQuestionAnswer";
import { changeLikeStatus } from "../controllers/userController/like/changeLikeStatus";
import { profile } from "../controllers/userController/profile";
import { addQuestion } from "../controllers/userController/question/addQuestion";
import { addQuestionWithAnswers } from "../controllers/userController/question/addQuestionWithAnswers";
import { deleteQuestion } from "../controllers/userController/question/deleteQuestion";
import { editQuestion } from "../controllers/userController/question/editQuestion";
import { editQuestionWithAnswers } from "../controllers/userController/question/editQuestionWithAnswers";
import { getQuestion } from "../controllers/userController/question/getQuestion";
import { getQuestions } from "../controllers/userController/question/getQuestions";
import { addTag } from "../controllers/userController/tags/addTag";
import { getAllTags } from "../controllers/userController/tags/getAllTags";
import { getAllTagsForTraining } from "../controllers/userController/tags/getAllTagsForTraining";
import { addTraining } from "../controllers/userController/training/addTraining";
import { deleteTraining } from "../controllers/userController/training/deleteTraining";
import { editTraining } from "../controllers/userController/training/editTraining";
import { getAllTrainings } from "../controllers/userController/training/getAllTrainings";
import { getOneTraining } from "../controllers/userController/training/getOneTraining";
import { endTrainingSession } from "../controllers/userController/trainingSession/endTrainingSession";
import { getTrainingSessionQuestions } from "../controllers/userController/trainingSession/getTrainingSessionQuestions";
import { getUserTrainingSession } from "../controllers/userController/trainingSession/getUserTrainingSession";
import { getUserTrainingSessions } from "../controllers/userController/trainingSession/getUserTrainingSessions";
import { startTrainingSession } from "../controllers/userController/trainingSession/startTrainingSession";
import { addUserAnswer } from "../controllers/userController/userAnswer/addUserAnswer";
import { checkBlockedUser } from "../middleware/checkBlockedUser";
import { addQuestionAnswerValidation } from "../middleware/validation/answer/addQuestionAnswerValidation";
import { addQuestionWithAnswersValidation } from "../middleware/validation/answer/addQuestionWithAnswersValidation";
import { editQuestionAnswerValidation } from "../middleware/validation/answer/editQuestionAnswerValidation";
import { editQuestionWithAnswersValidation } from "../middleware/validation/answer/editQuestionWithAnswersValidation";
import { addQuestionValidation } from "../middleware/validation/question/addQuestionValidation";
import { editQuestionValidation } from "../middleware/validation/question/editQuestionValidation";
import { addTagValidation } from "../middleware/validation/tags/addTagValidation";
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
userRouter.use(checkBlockedUser);

// TRAINING
userRouter.get("/training/all", getAllTrainings);
userRouter.get("/training/:trainingId", getOneTraining);
userRouter.post("/training", addTrainingValidation, addTraining);
userRouter.delete("/training/:trainingId", deleteTraining);
userRouter.put(
  "/training",
  addTrainingValidation,
  editTrainingValidation,
  editTraining
);

// TRAINING SESSION
userRouter.post("/training-session/start", startTrainingSession);
userRouter.post("/training-session/end", endTrainingSession);
userRouter.get(
  "/training-session/:trainingSessionId/questions",
  getTrainingSessionQuestions
);
userRouter.get("/training-session/all", getUserTrainingSessions);
userRouter.get("/training-session/:trainingSessionId", getUserTrainingSession);

// TAGS
userRouter.get("/tag", getAllTags);
userRouter.get("/tag/:trainingId", getAllTagsForTraining);
userRouter.post("/tag", addTagValidation, addTag);

// LIKES
userRouter.post("/like-switch/:trainingId", changeLikeStatus);

// QUESTIONS
userRouter.get("/question/all/:trainingId", getQuestions);
userRouter.get("/question/:questionId", getQuestion);
userRouter.delete("/question/:questionId", deleteQuestion);
userRouter.post("/question", addQuestionValidation, addQuestion);
userRouter.post(
  "/question/with-answers",
  addQuestionWithAnswersValidation,
  addQuestionWithAnswers
);
userRouter.put(
  "/question/with-answers",
  editQuestionWithAnswersValidation,
  editQuestionWithAnswers
);
userRouter.put("/question", editQuestionValidation, editQuestion);

// USER ANSWER
userRouter.post("/user-answer", addUserAnswer);

// QUESTION ANSWER
userRouter.delete("/question-answer/:questionAnswerId", deleteQuestionAnswer);
userRouter.post(
  "/question-answer",
  addQuestionAnswerValidation,
  addQuestionAnswer
);
userRouter.put(
  "/question-answer",
  editQuestionAnswerValidation,
  editQuestionAnswer
);

userRouter.post("/profile", profile);

export default userRouter;
