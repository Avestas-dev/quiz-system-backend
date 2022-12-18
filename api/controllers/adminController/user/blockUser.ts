import { NextFunction } from "express";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  BlockUserRequestModel,
  BlockUserResponseModel,
} from "../../../models/user/blockUserModel";

export const blockUser = async (
  req: BlockUserRequestModel,
  res: BlockUserResponseModel,
  next: NextFunction
) => {
  /* 	#swagger.tags = ['Admin-Users']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Block selected user for given time.'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Block given user to given date.',
            required: true,
            schema: { $ref: "#/definitions/BlockUserRequest" }
        }
  */
  const { blockedTo, userId } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });
    if (user?.isAdmin) {
      return validationErrorHandler(res, "CANNOT_BLOCK_ADMIN");
    }

    const blockedEntry = await prisma.blockedUser.create({
      data: {
        blockedTo: new Date(blockedTo),
        userId: Number(userId),
      },
    });

    // delete every entry that was there before
    await prisma.blockedUser.deleteMany({
      where: {
        userId: Number(blockedEntry.userId),
        NOT: {
          id: Number(blockedEntry.id),
        },
      },
    });

    return res.json();
  } catch (e) {
    console.log(e);
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
