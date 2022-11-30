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
  /* 	#swagger.tags = ['Tags']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Create new tag with status pending, to be accepted by admin.'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add tag by user.',
            required: true,
            schema: { $ref: "#/definitions/AddTagRequest" }
        }    
  */

  try {
    const { name } = req.body;
    const tags = await prisma.tag.create({
      data: {
        name: name,
      },
    });

    return res.json(tags);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
