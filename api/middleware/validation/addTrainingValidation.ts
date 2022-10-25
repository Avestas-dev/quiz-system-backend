import { NextFunction, Response } from "express";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { AddTrainingRequestModel } from "../../models/training/addTrainingModel";

export const addTrainingValidation = async (
  req: AddTrainingRequestModel,
  res: Response,
  next: NextFunction
) => {
  const { name, visibility } = req.body;
  if (!name) return validationErrorHandler(res, "TRAINING_NAME_NOT_PROVIDED");
  if (visibility == null)
    return validationErrorHandler(res, "TRAINING_VISIBILITY_NOT_PROVIDED");
  if (name?.length > 100)
    return validationErrorHandler(res, "TRAINING_NAME_TOO_LONG");
  if (name?.length < 3)
    return validationErrorHandler(res, "TRAINING_NAME_TOO_SHORT");
  // TODO: think about unique training name validation
  return next();
};
