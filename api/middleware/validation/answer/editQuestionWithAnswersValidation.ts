import { NextFunction } from "express";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  EditQuestionWithAnswersRequestModel,
  EditQuestionWithAnswersResponseModel,
} from "../../../models/question/editQuestionWithAnswersModel";

export const editQuestionWithAnswersValidation = async (
  req: EditQuestionWithAnswersRequestModel,
  res: EditQuestionWithAnswersResponseModel,
  next: NextFunction
) => {
  const { question, questionId, answers } = req.body;
  if (!question) return validationErrorHandler(res, "QUESTION_NOT_PROVIDED");
  if (!question) return validationErrorHandler(res, "TRAINING_ID_NOT_PROVIDED");
  if (question?.length > 500)
    return validationErrorHandler(res, "QUESTION_TOO_LONG");

  const foundQuestion = await prisma.question.findFirst({
    where: {
      id: questionId,
      training: {
        userId: res.locals.user.id,
      },
    },
  });
  if (!foundQuestion) return validationErrorHandler(res, "QUESTION_NOT_EXIST");

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
