import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  EditTagRequestModel,
  EditTagResponseModel,
} from "../../../models/tags/editTagModel";

export const editTag = async (
  req: EditTagRequestModel,
  res: EditTagResponseModel
) => {
  /* 	#swagger.tags = ['Admin-Tags']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Edit tag.'
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Edit tag.',
        required: true,
        schema: { $ref: "#/definitions/EditTagRequest" },
      } 
  */

  try {
    const { name, tagId } = req.body;
    const { count } = await prisma.tag.updateMany({
      where: {
        id: Number(tagId),
      },
      data: {
        name: name,
      },
    });
    if (count === 0) return validationErrorHandler(res, "NO_TAGS_UPDATED");
    return res.json(count);
  } catch (e) {
    console.log(e);
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
