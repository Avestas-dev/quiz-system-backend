import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import { LoginGoogleRequestModel } from "../../models/auth/loginGoogleModel";
import {
  LoginRequestModel,
  LoginResponseModel,
} from "../../models/auth/loginModel";

export const processLogin = async (
  req: LoginRequestModel | LoginGoogleRequestModel,
  res: LoginResponseModel
) => {
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

    // update user refresh token
    const updatedUser = await prisma.user.update({
      data: {
        refreshToken: refreshToken,
      },
      where: { id: res.locals.user.id },
    });

    return res.json({
      token: token,
      refreshToken: refreshToken,
      email: res.locals.user.email,
      userId: updatedUser.id,
    });
  }

  return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
};

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
        schema: { $ref: "#/definitions/LoginRequest" },
      } 
      #swagger.responses[200] = {
        description: 'User successfully logged in.',
        schema: { $ref: "#/definitions/LoginResponse" }
      }  
  */

  await processLogin(req, res);
};
