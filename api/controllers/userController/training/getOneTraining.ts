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
  /* 	#swagger.tags = ['Training']
        #swagger.description = 'Gets one training.'
        #swagger.responses[200] = {
        description: 'One training received.',
        schema: { $ref: '#/definitions/GetOneTrainingResponse' }
      }
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Get one training request.',
            required: true,
            schema: { $ref: "#/definitions/GetOneTrainingRequest" }
        }      
  */
  const { trainingId } = req.body;

  const training = await prisma.training.findFirst({
    where: {
      OR: [
        {
          id: trainingId,
          userId: res.locals.user.id,
        },
        { id: trainingId, visibility: true },
      ],
    },
  });

  if (!training) return validationErrorHandler(res, "TRAINING_NOT_FOUND");

  return res.json(training);
};
