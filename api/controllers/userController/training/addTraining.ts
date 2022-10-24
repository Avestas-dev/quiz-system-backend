import { Prisma } from "@prisma/client";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import { AddTrainingRequestModel } from "../../../models/addTraining";
import { AuthResponse } from "../../../models/authRequest";

export const addTraining = async (
  req: AddTrainingRequestModel,
  res: AuthResponse
) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Create training'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create reuqest.',
            required: true,
            schema: { $ref: "#/definitions/AddTrainingRequest" }
        }         
  */

  const { name, visibility } = req.body;

  try {
    await prisma.training.create({
      data: {
        name: name,
        visibility: visibility,
        userId: res.locals.user.id,
      },
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
