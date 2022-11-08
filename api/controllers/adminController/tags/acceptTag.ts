import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  AcceptTagRequestModel,
  AcceptTagResponseModel,
} from "../../../models/tags/acceptTagModel";

export const acceptTag = async (
  req: AcceptTagRequestModel,
  res: AcceptTagResponseModel
) => {
  /* 	#swagger.tags = ['Admin-Tags']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Accept new tag.'
  */

  try {
    const { tagId } = req.body;
    const tags = await prisma.tag.updateMany({
      where: {
        id: tagId,
      },
      data: {
        tagStatus: "accepted",
      },
    });

    return res.json(tags);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
