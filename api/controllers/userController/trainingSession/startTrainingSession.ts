import { Prisma } from ".prisma/client";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  StartTrainingSessionRequestModel,
  StartTrainingSessionResponseModel,
} from "../../../models/trainingSession/startTrainingSessionModel";

export const startTrainingSession = async (
  req: StartTrainingSessionRequestModel,
  res: StartTrainingSessionResponseModel
) => {
  /* 	#swagger.tags = ['Training Session']
        #swagger.description = 'Start training sessions'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Start training session request.',
            required: true,
            schema: { $ref: "#/definitions/StartTrainingSessionRequest" }
        }         
  */

  const { trainingId } = req.body;

  try {
    // if training session exist, then response is success.
    const existingSession = await prisma.trainingSession.findFirst({
      where: {
        trainingId: trainingId,
        userId: res.locals.user.id,
        finished: false,
      },
    });

    // if training session does not exist, then create new one
    if (!existingSession) {
      await prisma.trainingSession.create({
        data: {
          trainingId: trainingId,
          userId: res.locals.user.id,
          finished: false,
        },
      });
    }
    return res.json();
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2003"
    ) {
      return validationErrorHandler(res, "TRAINING_NOT_EXISTS");
    } else {
      return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  }
};
