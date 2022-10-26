import { NextFunction, Request } from "express";
import { OAuth2Client } from "google-auth-library";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import { LoginGoogleResponseModel } from "../../models/auth/loginGoogleModel";

export const loginGoogle = async (
  req: Request,
  res: LoginGoogleResponseModel,
  next: NextFunction
) => {
  /* 	#swagger.tags = ['Auth']
      #swagger.description = 'Endpoint to sign in a specific user using Google' 
  	  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User google login.',
        required: true,
        schema: { $ref: "#/definitions/LoginGoogleRequest" }
      } 
      #swagger.responses[200] = {
        description: 'User successfully logged in.',
        schema: { $ref: '#/definitions/LoginGoogleResponse' }
      }
  */
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: req.body.tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload && payload?.email) {
      const user = await prisma.user.findFirst({
        where: {
          googleSub: payload["sub"],
        },
      });
      if (user) {
        res.locals.user = user;
        return next();
      } else {
        return validationErrorHandler(res, "USER_NOT_EXIST");
      }
    }
  } catch (e) {
    return validationErrorHandler(res, "GOOGLE_LOGIN_FAILED");
  }
  return validationErrorHandler(res, "GOOGLE_LOGIN_FAILED");
};
