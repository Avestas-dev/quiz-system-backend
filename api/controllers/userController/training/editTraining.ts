import { Prisma } from "@prisma/client";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import { AuthResponse } from "../../../models/auth/authRequest";
import { EditTrainingRequestModel } from "../../../models/training/editTrainingModel";

export const editTraining = async (
  req: EditTrainingRequestModel,
  res: AuthResponse
) => {
  /* 	#swagger.tags = ['Training']
        #swagger.description = 'Edit training'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit request.',
            required: true,
            schema: { $ref: "#/definitions/EditTrainingRequest" }
        }         
  */

  const { trainingId, name, visibility, tagIds } = req.body;

  try {
    await prisma.training.updateMany({
      data: {
        name: name,
        visibility: visibility,
        userId: res.locals.user.id,
      },
      where: {
        id: trainingId,
        userId: res.locals.user.id,
      },
    });
    await prisma.tagTraining.deleteMany({
      where: {
        trainingId: trainingId,
      },
    });
    await prisma.tagTraining.createMany({
      data: tagIds.map((tagId) => {
        return { tagId: tagId, trainingId: trainingId };
      }),
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return validationErrorHandler(res, "TRAINING_NAME_ALREADY_EXIST");
    } else {
      return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  }
  return res.json({});
};
