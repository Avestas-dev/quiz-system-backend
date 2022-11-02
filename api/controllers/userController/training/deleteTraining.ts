import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  DeleteTrainingRequestModel,
  DeleteTrainingsResponseModel,
} from "../../../models/training/deleteTrainingModel";

export const deleteTraining = async (
  req: DeleteTrainingRequestModel,
  res: DeleteTrainingsResponseModel
) => {
  /* 	#swagger.tags = ['Training']
      #swagger.description = 'Delete training.'
      #swagger.security = [{"apiKeyAuth": []}]
      
      
  */
  const { trainingId } = req.params;

  const training = await prisma.training.deleteMany({
    where: {
      id: Number(trainingId),
      userId: res.locals.user.id,
    },
  });
  if (training.count > 0) res.json();
  else return validationErrorHandler(res, "TRAINING_NOT_FOUND");
};
