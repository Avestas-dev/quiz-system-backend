import { NextFunction } from "express";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  EditQuestionAnswerRequestModel,
  EditQuestionAnswerResponseModel,
} from "../../../models/answer/editQuestionAnswerModel";

export const editQuestionAnswerValidation = async (
  req: EditQuestionAnswerRequestModel,
  res: EditQuestionAnswerResponseModel,
  next: NextFunction
) => {
  const { answer, isCorrect, questionAnswerId } = req.body;
  if (!answer) return validationErrorHandler(res, "ANSWER_NOT_PROVIDED");
  if (typeof isCorrect !== "boolean")
    return validationErrorHandler(res, "IS_CORRECT_NOT_PROVIDED");
  if (!questionAnswerId)
    return validationErrorHandler(res, "QUESTION_ANSWER_ID_NOT_PROVIDED");
  if (answer?.length > 500)
    return validationErrorHandler(res, "ANSWER_TOO_LONG");

  const questionAnswer = await prisma.questionAnswer.findFirst({
    where: {
      id: questionAnswerId,
    },
  });
  if (!questionAnswer)
    return validationErrorHandler(res, "QUESTION_ANSWER_NOT_EXIST");

  return next();
};
