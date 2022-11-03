import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetAllTagsRequestModel,
  GetAllTagsResponseModel,
} from "../../../models/tags/getAllTagsModel";

export const getAllTags = async (
  req: GetAllTagsRequestModel,
  res: GetAllTagsResponseModel
) => {
  /* 	#swagger.tags = ['Tags']
        #swagger.description = 'Get all available tags for training.'
        #swagger.security = [{"apiKeyAuth": []}]
          #swagger.responses[200] = {
          schema: { $ref: '#/definitions/TagsResponse' }
        }
  */

  try {
    const tags = await prisma.tag.findMany({
      where: {
        tagStatus: "accepted",
      },
    });

    return res.json(tags);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
