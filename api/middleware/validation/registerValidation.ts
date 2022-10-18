import { NextFunction } from "express";
import validator from "validator";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import {
  RegisterRequestModel,
  RegisterResponseModel,
} from "../../models/registerModel";

export const registerValidation = async (
  req: RegisterRequestModel,
  res: RegisterResponseModel,
  next: NextFunction
) => {
  const { password, email, passwordRepeated } = req.body;
  if (!email) return validationErrorHandler(res, "EMAIL_REQUIRED");
  if (!password) return validationErrorHandler(res, "PASSWORD_REQUIRED");
  if (!passwordRepeated)
    return validationErrorHandler(res, "PASSWORD_REPEATED_REQUIRED");

  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
    })
  )
    return validationErrorHandler(res, "PASSWORD_STRENGTH");

  if (!validator.equals(password, passwordRepeated))
    return validationErrorHandler(res, "PASSWORD_MISSMATCH");

  if (!validator.isEmail(email))
    return validationErrorHandler(res, "WRONG_EMAIL");

  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  if (user) return validationErrorHandler(res, "USER_EXISTS");

  next();
};
