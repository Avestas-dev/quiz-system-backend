import { NextFunction, Response } from "express";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { AddTrainingRequestModel } from "../../models/addTraining";

export const addTrainingValidation = async (
  req: AddTrainingRequestModel,
  res: Response,
  next: NextFunction
) => {
  const { name, visibility } = req.body;
  if (!name) return validationErrorHandler(res, "TRAINING_NAME_NOT_PROVIDED");
  if (!visibility)
    return validationErrorHandler(res, "TRAINING_VISIBILITY_NOT_PROVIDED");
  if (name?.length > 100)
    return validationErrorHandler(res, "TRAINING_NAME_TOO_LONG");

  // TODO: think about unique training name validation
  return next();
};
