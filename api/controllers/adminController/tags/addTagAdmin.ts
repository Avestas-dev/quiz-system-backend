import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  AddTagRequestModel,
  AddTagResponseModel,
} from "../../../models/tags/addTagModel";

export const addTag = async (
  req: AddTagRequestModel,
  res: AddTagResponseModel
) => {
  /* 	#swagger.tags = ['Admin-Tags']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Create new tag, that is already accepted.',
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Add tag.',
        required: true,
        schema: { $ref: "#/definitions/AddTagAdminRequest" },
      } 
  */

  try {
    const { name } = req.body;
    const tags = await prisma.tag.create({
      data: {
        name: name,
        tagStatus: "accepted",
      },
    });

    return res.json(tags);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
