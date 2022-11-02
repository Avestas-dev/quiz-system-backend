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
        #swagger.description = 'Start training session. It makes new training session with finished status set to false. If training session with given id already exists, then response is always success - before creating new training session, it is required to use /training-session/end endpoint.'
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
      const newTrainingSession = await prisma.trainingSession.create({
        data: {
          trainingId: trainingId,
          userId: res.locals.user.id,
          finished: false,
        },
      });
      return res.json({ trainingSessionId: newTrainingSession.id });
    } else {
      return res.json({ trainingSessionId: existingSession.id });
    }
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
