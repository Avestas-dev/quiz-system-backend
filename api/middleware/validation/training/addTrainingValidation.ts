import { NextFunction, Response } from "express";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import { AddTrainingRequestModel } from "../../../models/training/addTrainingModel";

export const addTrainingValidation = async (
  req: AddTrainingRequestModel,
  res: Response,
  next: NextFunction
) => {
  const { name, visibility, tagIds } = req.body;
  if (!name) return validationErrorHandler(res, "TRAINING_NAME_NOT_PROVIDED");
  if (visibility == null)
    return validationErrorHandler(res, "TRAINING_VISIBILITY_NOT_PROVIDED");
  if (name?.length > 100)
    return validationErrorHandler(res, "TRAINING_NAME_TOO_LONG");
  if (name?.length < 3)
    return validationErrorHandler(res, "TRAINING_NAME_TOO_SHORT");

  const allTags = await prisma.tag.findMany({
    where: {
      tagStatus: "accepted",
    },
  });

  if (!tagIds.every((at) => !!allTags.find((t) => t.id == at)))
    return validationErrorHandler(res, "INCORRECT_TAG_ARRAY");
  return next();
};
