import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  EndTrainingSessionRequestModel,
  EndTrainingSessionResponseModel,
} from "../../../models/trainingSession/endTrainingSessionModel";

export const endTrainingSession = async (
  req: EndTrainingSessionRequestModel,
  res: EndTrainingSessionResponseModel
) => {
  /* 	#swagger.tags = ['Training Session']
        #swagger.description = 'Ends training session, setting its finished status to true. '
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Ending of training session request.',
            required: true,
            schema: { $ref: "#/definitions/EndTrainingSessionRequest" }
        }         
  */
  const { trainingId } = req.body;

  try {
    const { count } = await prisma.trainingSession.updateMany({
      where: {
        trainingId: trainingId,
        userId: res.locals.user.id,
        finished: false,
      },
      data: {
        finished: true,
      },
    });
    if (count === 0)
      return validationErrorHandler(res, "TRAINING_SESSION_NOT_FINISHED");

    return res.json();
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
