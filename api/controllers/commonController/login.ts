import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { LoginRequestModel, LoginResponseModel } from "../../models/loginModel";

const prisma = new PrismaClient();

export const login = async (
  req: LoginRequestModel,
  res: LoginResponseModel
) => {
  /* 	#swagger.tags = ['Auth']
      #swagger.description = 'Endpoint to sign in a specific user' 
  	  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User login.',
        required: true,
        schema: { $ref: "#/definitions/LoginRequest" }
      } 
      #swagger.responses[200] = {
        description: 'User successfully logged in.',
        schema: { $ref: '#/definitions/LoginResponse' 
      }
  */

  if (process.env.TOKEN_KEY) {
    // generate token
    const token = jwt.sign(
      { user_id: res.locals.user.id },
      process.env.TOKEN_KEY,
      {
        expiresIn: 10,
      }
    );

    // generate random refresh token
    const refreshToken = randomUUID();

    // update user refresh token
    await prisma.user.update({
      data: {
        refreshToken: refreshToken,
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
