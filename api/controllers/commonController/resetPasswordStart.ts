import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { Response } from "express";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { LoginRequestModel } from "../../models/loginModel";
const prisma = new PrismaClient();

export const resetPasswordStart = async (
  req: LoginRequestModel,
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

  if (!user) validationErrorHandler(res, "USER_NOT_EXIST");

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

  await prisma.user.update({
    where: {
      email: req.body.email,
    },
    data: {
      passwordResetDate: new Date(),
      passwordResetToken: randomUUID(),
    },
  });

  res.json({});
};
