import { NextFunction } from "express";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import {
  EditQuestionRequestModel,
  EditQuestionResponseModel,
} from "../../models/question/editQuestionModel";

export const editQuestionValidation = async (
  req: EditQuestionRequestModel,
  res: EditQuestionResponseModel,
  next: NextFunction
) => {
  const { question, questionId } = req.body;
  if (!question) return validationErrorHandler(res, "QUESTION_NOT_PROVIDED");
  if (!questionId)
    return validationErrorHandler(res, "QUESTION_ID_NOT_PROVIDED");
  if (question?.length > 500)
    return validationErrorHandler(res, "QUESTION_TOO_LONG");

  const foundQuestion = await prisma.question.findFirst({
    where: {
      id: questionId,
    },
  });
  if (!foundQuestion) return validationErrorHandler(res, "QUESTION_NOT_EXIST");

  return next();
};
