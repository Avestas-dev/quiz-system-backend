import bcrypt from "bcrypt";
import { NextFunction } from "express";
import validator from "validator";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  LoginRequestModel,
  LoginResponseModel,
} from "../../../models/auth/loginModel";

export const loginValidation = async (
  req: LoginRequestModel,
  res: LoginResponseModel,
  next: NextFunction
) => {
  const { password, email } = req.body;

  if (!email) return validationErrorHandler(res, "EMAIL_REQUIRED");
  if (!password) return validationErrorHandler(res, "PASSWORD_REQUIRED");

  if (!validator.isEmail(email))
    return validationErrorHandler(res, "WRONG_EMAIL");

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

  const user = await prisma.user.findFirst({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!user) return validationErrorHandler(res, "USER_NOT_EXIST");

  const passwordOK = await bcrypt.compare(password, user.password);
  if (!passwordOK) return validationErrorHandler(res, "PASSWORD_INCORRECT");

  res.locals.user = user;

  next();
};
