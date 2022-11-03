import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetAllTagsForTrainingRequestModel,
  GetAllTagsForTrainingResponseModel,
} from "../../../models/tags/getAllTagsForTrainingModel";

export const getAllTagsForTraining = async (
  req: GetAllTagsForTrainingRequestModel,
  res: GetAllTagsForTrainingResponseModel
) => {
  /* 	#swagger.tags = ['Tags']
        #swagger.description = 'Get all available tags for training.'
        #swagger.security = [{"apiKeyAuth": []}]
          #swagger.responses[200] = {
          schema: { $ref: '#/definitions/TagsResponse' }
        }
  */

  try {
    const { trainingId } = req.params;
    const tags = await prisma.tagTraining.findMany({
      select: {
        tag: true,
      },
      where: {
        trainingId: Number(trainingId),
        tag: {
          tagStatus: "accepted",
        },
      },
    });
    return res.json(
      tags.map((e) => ({
        id: e.tag.id,
        name: e.tag.name,
        tagStatus: e.tag.tagStatus,
      }))
    );
  } catch (e) {
    console.log(e);
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
