import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {} from "../../../models/user/blockUserModel";
import {
  GetAllUsersRequestModel,
  GetAllUsersResponseModel,
} from "../../../models/user/getAllUsersModel";

export const getAllUsers = async (
  req: GetAllUsersRequestModel,
  res: GetAllUsersResponseModel
) => {
  /* 	#swagger.tags = ['Admin-Users']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Get All Users.'
      #swagger.responses[200] = {
        description: 'Users downloaded successfully.',
        schema: { $ref: "#/definitions/GetAllUsersResponse" }
      }  
  */

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        passwordResetDate: true,
        isAdmin: true,
        googleSub: true,
        BlockedUser: true,
      },
    });
    const newUsers = users.map(({ BlockedUser, ...user }) => ({
      ...user,
      blockedDate: BlockedUser?.[0]?.blockedTo || undefined,
    }));
    return res.json(newUsers);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
