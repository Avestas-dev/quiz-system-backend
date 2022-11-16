import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { Response } from "express";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import { sendResetPasswordEmail } from "../../helpers/sendResetPasswordEmail";
import { ResetPasswordStartRequestModel } from "../../models/auth/resetPasswordModel";

export const resetPasswordStart = async (
  req: ResetPasswordStartRequestModel,
  res: Response
) => {
  /*  #swagger.tags = ['Auth']
      #swagger.description = 'Endpoint to start reset password procedure' 
  	  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User reset.',
        required: true,
        schema: { $ref: "#/definitions/ResetStartRequest" }
      } 
  */
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return validationErrorHandler(res, "USER_NOT_EXIST");

  if (user?.passwordResetDate) {
    if (
      !dayjs(new Date()).isAfter(
        dayjs(new Date(user?.passwordResetDate)).add(
          process.env.RESET_PASSWORD_DELAY,
          "minutes"
        )
      )
    )
      return validationErrorHandler(res, "RESET_TIME_TOO_LOW");
  }
  const randomGUID = randomUUID();
  const isSuccess = await sendResetPasswordEmail({
    email: user.email,
    resetGUID: randomGUID,
  });
  if (isSuccess) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetDate: new Date(),
        passwordResetToken: randomGUID,
      },
    });
    return res.json({});
  } else {
    return validationErrorHandler(res, "RESET_PASSWORD_FAILED");
  }
};
