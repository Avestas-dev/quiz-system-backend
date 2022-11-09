import dayjs from "dayjs";
import { NextFunction, Request } from "express";
import { validationErrorHandler } from "../helpers/errorHandler";
import { prisma } from "../helpers/prisma";
import { AuthResponse } from "../models/auth/authRequest";

export const checkBlockedUser = async (
  req: Request,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const blockedUser = await prisma.blockedUser.findFirst({
      where: {
        userId: res.locals.user.id,
      },
    });

    if (blockedUser && dayjs(blockedUser?.blockedTo).isAfter(new Date())) {
      return validationErrorHandler(res, "USER_IS_BLOCKED");
    }

    return next();
  } catch (e) {
    console.log(e);
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
