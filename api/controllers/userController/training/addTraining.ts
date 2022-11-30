import { Prisma } from "@prisma/client";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  AddTrainingRequestModel,
  AddTrainingResponseModel,
} from "../../../models/training/addTrainingModel";

export const addTraining = async (
  req: AddTrainingRequestModel,
  res: AddTrainingResponseModel
) => {
  /* 	#swagger.tags = ['Training']
        #swagger.description = 'Create training'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create request.',
            required: true,
            schema: { $ref: "#/definitions/AddTrainingRequest" }
        }         
  */

  const { name, visibility, tagIds } = req.body;

  try {
    const createdTraining = await prisma.training.create({
      data: {
        name: name,
        visibility: visibility,
        userId: res.locals.user.id,
      },
    });
    await prisma.tagTraining.deleteMany({
      where: {
        trainingId: createdTraining.id,
      },
    });
    await prisma.tagTraining.createMany({
      data: tagIds.map((tagId) => {
        return { tagId: tagId, trainingId: createdTraining.id };
      }),
    });
    return res.json(createdTraining);
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
};
