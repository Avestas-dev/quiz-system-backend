import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetOneTrainingRequestModel,
  GetOneTrainingsResponseModel,
} from "../../../models/training/getOneTrainingModel";

export const getOneTraining = async (
  req: GetOneTrainingRequestModel,
  res: GetOneTrainingsResponseModel
) => {
  /* 	  
    #swagger.tags = ['Training']
    #swagger.description = 'Gets one training.'
    #swagger.security = [{"apiKeyAuth": []}]
    #swagger.responses[200] = {
      description: 'One training received.',
      schema: { $ref: '#/definitions/GetOneTrainingResponse' }
    }
    
  */
  const { trainingId } = req.params;

  const training = await prisma.training.findFirst({
    where: {
      OR: [
        {
          id: Number(trainingId),
          userId: res.locals.user.id,
        },
        { id: Number(trainingId), visibility: true },
      ],
    },
    include: {
      TagTraining: {
        include: {
          tag: true,
        },
      },
      LikeTraining: true,
    },
  });

  if (!training) return validationErrorHandler(res, "TRAINING_NOT_FOUND");

  return res.json({
    ...training,
    LikeTraining: !!training.LikeTraining.length,
  });
};
