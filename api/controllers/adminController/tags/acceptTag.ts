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
    const { count } = await prisma.tag.updateMany({
      where: {
        id: Number(tagId),
      },
      data: {
        tagStatus: "accepted",
      },
    });
    if (count === 0) return validationErrorHandler(res, "NO_TAGS_UPDATED");
    return res.json(count);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
