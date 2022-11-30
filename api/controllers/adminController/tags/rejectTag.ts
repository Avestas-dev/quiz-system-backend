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
      #swagger.description = 'Reject tag.'
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Reject tag.',
        required: true,
        schema: { $ref: "#/definitions/RejectTagRequest" },
      } 
  */

  try {
    const { tagId } = req.body;
    const { count } = await prisma.tag.updateMany({
      where: {
        id: Number(tagId),
      },
      data: {
        tagStatus: "rejected",
      },
    });
    if (count === 0) return validationErrorHandler(res, "NO_TAGS_UPDATED");
    return res.json(count);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
