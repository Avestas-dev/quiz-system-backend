import { NextFunction } from "express";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import {
  AddTagRequestModel,
  AddTagResponseModel,
} from "../../../models/tags/addTagModel";

export const addTagValidation = async (
  req: AddTagRequestModel,
  res: AddTagResponseModel,
  next: NextFunction
) => {
  const { name } = req.body;
  if (!name) return validationErrorHandler(res, "TAG_NAME_NOT_PROVIDED");
  if (name.length >= 30)
    return validationErrorHandler(res, "TAG_NAME_TOO_LONG");
  if (name.length <= 2)
    return validationErrorHandler(res, "TAG_NAME_TOO_SHORT");

  return next();
};
