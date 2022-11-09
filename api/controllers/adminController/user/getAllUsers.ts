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
  */

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        CreatedAt: true,
        UpdatedAt: true,
        email: true,
        passwordResetDate: true,
        isAdmin: true,
        googleSub: true,
      },
    });
    return res.json(users);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
