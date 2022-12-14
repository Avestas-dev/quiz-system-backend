import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetOneTrainingRequestModel,
  GetOneTrainingResponseModel,
} from "../../../models/training/getOneTrainingModel";

export const getOneTraining = async (
  req: GetOneTrainingRequestModel,
  res: GetOneTrainingResponseModel
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
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      TagTraining: {
        where: {
          tag: {
            tagStatus: "accepted",
          },
        },
        include: {
          tag: true,
        },
      },
      LikeTraining: true,
      TrainingSession: {
        select: {
          id: true,
          finished: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          userId: res.locals.user.id,
          finished: false,
        },
      },
    },
  });

  if (!training) return validationErrorHandler(res, "TRAINING_NOT_FOUND");
  const mappedTraining = [training].map(
    ({ TrainingSession, LikeTraining, TagTraining, ...al }) => ({
      ...al,
      tagTraining: TagTraining.map((e) => ({
        tagId: e.tagId,
        tagName: e.tag.name,
      })),
      likedTraining: !!LikeTraining.length,
      trainingSession: TrainingSession,
    })
  );
  return res.json({
    ...mappedTraining?.[0],
  });
};
