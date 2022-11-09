import { Request, Response } from "express";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
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
