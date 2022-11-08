import { NextFunction, Request } from "express";
import { validationErrorHandler } from "../helpers/errorHandler";
import { AuthResponse } from "../models/auth/authRequest";

export const verifyAdmin = async (
  req: Request,
  res: AuthResponse,
  next: NextFunction
) => {
  if (res.locals?.user?.isAdmin) return next();
  return validationErrorHandler(res, "USER_NOT_ADMIN");
};
