import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  UnlockUserRequestModel,
  UnlockUserResponseModel,
} from "../../../models/user/unlockUserModel";

export const unlockUser = async (
  req: UnlockUserRequestModel,
  res: UnlockUserResponseModel
) => {
  /* 	#swagger.tags = ['Admin-Users']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Unlock given user.'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Unlock given user.',
            required: true,
            schema: { $ref: "#/definitions/UnlockUserRequest" }
        }
  */
  const { userId } = req.body;
  try {
    // delete every entry that was there before
    await prisma.blockedUser.deleteMany({
      where: {
        userId: userId,
      },
    });

    return res.json();
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
