import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetAllTagsRequestModel,
  GetAllTagsResponseModel,
} from "../../../models/tags/getAllTagsModel";

export const getAllTagsAdmin = async (
  req: GetAllTagsRequestModel,
  res: GetAllTagsResponseModel
) => {
  /* 	#swagger.tags = ['Admin-Tags']
        #swagger.description = 'Get all available tags for training.'
        #swagger.security = [{"apiKeyAuth": []}]
          #swagger.responses[200] = {
          schema: { $ref: '#/definitions/TagsResponse' }
        }
  */

  try {
    const tags = await prisma.tag.findMany();

    return res.json(tags);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
