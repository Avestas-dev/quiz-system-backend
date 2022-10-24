import { NextFunction, Response } from "express";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import { EditTrainingRequestModel } from "../../models/editTrainingModel";

export const editTrainingValidation = async (
  req: EditTrainingRequestModel,
  res: Response,
  next: NextFunction
) => {
  const { trainingId } = req.body;

  const training = await prisma.training.findFirst({
    where: {
      id: trainingId,
      userId: res.locals.user.id,
    },
  });
  if (!training)
    return validationErrorHandler(res, "EDITED_TRAINING_NOT_FOUND");

  return next();
};
