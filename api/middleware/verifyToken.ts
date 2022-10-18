import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationErrorHandler } from "../helpers/errorHandler";
import { prisma } from "../helpers/prisma";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return validationErrorHandler(res, "TOKEN_NOT_PROVIDED");
  try {
    const decoded = jwt.verify(
      token,
      process?.env?.TOKEN_KEY as string
    ) as jwt.JwtPayload & {
      user_id: number;
      iat: number;
      exp: number;
    };

    const user = await prisma.user.findFirst({
      where: { id: decoded.user_id },
    });
    console.log(user);

    res.locals.user = { email: user?.email, id: user?.id };

    return next();
  } catch (err: any) {
    console.log(err);
    if (err?.name && err.name === "JsonWebTokenError") {
      return validationErrorHandler(res, "TOKEN_INVALID");
    } else if (err?.name && err.name === "TokenExpiredError") {
      return validationErrorHandler(res, "TOKEN_EXPIRED");
    } else return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
