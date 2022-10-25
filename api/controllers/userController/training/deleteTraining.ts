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
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Delete training.'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Delete request.',
            required: true,
            schema: { $ref: "#/definitions/DeleteTrainingRequest" }
        } 
      }
  */
  const { trainingId } = req.body;

  const training = await prisma.training.deleteMany({
    where: {
      id: trainingId,
      userId: res.locals.user.id,
    },
  });
  if (training.count) res.json();
  else return validationErrorHandler(res, "TRAINING_NOT_FOUND");
};
