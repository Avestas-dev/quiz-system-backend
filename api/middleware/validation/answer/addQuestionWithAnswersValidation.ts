import { NextFunction } from "express";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  AddQuestionWithAnswersRequestModel,
  AddQuestionWithAnswersResponseModel,
} from "../../../models/question/addQuestionWithAnswersModel";

export const addQuestionWithAnswersValidation = async (
  req: AddQuestionWithAnswersRequestModel,
  res: AddQuestionWithAnswersResponseModel,
  next: NextFunction
) => {
  const { question, trainingId, answers } = req.body;
  if (!question) return validationErrorHandler(res, "QUESTION_NOT_PROVIDED");
  if (!trainingId)
    return validationErrorHandler(res, "TRAINING_ID_NOT_PROVIDED");
  if (question?.length > 500)
    return validationErrorHandler(res, "QUESTION_TOO_LONG");

  const training = await prisma.training.findFirst({
    where: {
      id: trainingId,
      userId: res.locals.user.id,
    },
  });
  if (!training) return validationErrorHandler(res, "TRAINING_NOT_FOUND");

  const answerValidation = answers.every(({ answer, isCorrect }) => {
    return (
      !!answer &&
      typeof isCorrect === "boolean" &&
      answer.length > 0 &&
      answer.length <= 500
    );
  });

  if (!answerValidation)
    return validationErrorHandler(res, "ANSWER_ARRAY_VALIDATION_ERROR");

  return next();
};
