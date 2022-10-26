import { NextFunction } from "express";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import {
  AddQuestionAnswerRequestModel,
  AddQuestionAnswerResponseModel,
} from "../../../models/answer/addQuestionAnswerModel";

export const addQuestionAnswerValidation = async (
  req: AddQuestionAnswerRequestModel,
  res: AddQuestionAnswerResponseModel,
  next: NextFunction
) => {
  const { answer, isCorrect, questionId } = req.body;
  if (!answer) return validationErrorHandler(res, "ANSWER_NOT_PROVIDED");
  if (!(typeof isCorrect === "boolean"))
    return validationErrorHandler(res, "IS_CORRECT_NOT_PROVIDED");
  if (!questionId)
    return validationErrorHandler(res, "QUESTION_ID_NOT_PROVIDED");
  if (answer?.length > 500)
    return validationErrorHandler(res, "ANSWER_TOO_LONG");

  // TODO: add max answer restriction for question

  return next();
};
