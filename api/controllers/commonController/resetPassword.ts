import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import { ResetPasswordRequestModel } from "../../models/auth/resetPasswordModel";

// TODO: add validation link expiry check - if password was generated more than hour ago, then send info about expiry + add info about it to email
export const resetPassword = async (
  req: ResetPasswordRequestModel,
  res: Response
) => {
  /*  #swagger.tags = ['Auth']
      #swagger.description = 'Endpoint to start reset password procedure' 
  	  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User reset.',
        required: true,
        schema: { $ref: "#/definitions/ResetRequest" }
      } 
  */

  if (process.env.TOKEN_KEY) {
    // generate token
    const token = jwt.sign(
      { user_id: res.locals.user.id },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_VALIDATION_TIME,
      }
    );

    // generate random refresh token
    const refreshToken = randomUUID();
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    // update user refresh token
    await prisma.user.update({
      data: {
        password: encryptedPassword,
        refreshToken: refreshToken,
        passwordResetDate: null,
        passwordResetToken: null,
      },
      where: { id: res.locals.user.id },
    });

    return res.json({
      token: token,
      refreshToken: refreshToken,
      email: res.locals.user.email,
    });
  }

  return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
};
