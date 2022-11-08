import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  RejectTagRequestModel,
  RejectTagResponseModel,
} from "../../../models/tags/rejectTagModel.ts";

export const rejectTag = async (
  req: RejectTagRequestModel,
  res: RejectTagResponseModel
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
        tagStatus: "rejected",
      },
    });

    return res.json(tags);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
