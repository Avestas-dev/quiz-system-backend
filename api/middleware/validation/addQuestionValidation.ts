import { NextFunction } from "express";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import {
  AddQuestionRequestModel,
  AddQuestionResponseModel,
} from "../../models/question/addQuestionModel";

export const addQuestionValidation = async (
  req: AddQuestionRequestModel,
  res: AddQuestionResponseModel,
  next: NextFunction
) => {
  const { question, trainingId } = req.body;
  if (!question) return validationErrorHandler(res, "QUESTION_NOT_PROVIDED");
  if (!trainingId)
    return validationErrorHandler(res, "TRAINING_ID_NOT_PROVIDED");
  if (question?.length > 500)
    return validationErrorHandler(res, "QUESTION_TOO_LONG");

  const training = await prisma.training.findFirst({
    where: {
      id: trainingId,
    },
  });
  if (!training) return validationErrorHandler(res, "TRAINING_NOT_FOUND");

  return next();
};
