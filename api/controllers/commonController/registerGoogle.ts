import { Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";
import { RegisterGoogleRequestModel } from "../../models/auth/registerGoogleModel";

export const registerGoogle = async (
  req: RegisterGoogleRequestModel,
  res: Response
) => {
  /* 	#swagger.tags = ['Auth']
      #swagger.description = 'Endpoint to sign up a specific user using Google' 
  	  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User google register.',
        required: true,
        schema: { $ref: "#/definitions/RegisterGoogleRequest" }
      } 
      #swagger.responses[200] = {
        description: 'User successfully logged in.',
        schema: { $ref: '#/definitions/RegisterGoogleResponse' }
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
          email: payload["email"],
        },
      });
      if (user) {
        return validationErrorHandler(res, "USER_EXISTS");
      } else {
        const user = await prisma.user.create({
          data: {
            email: payload["email"],
            password: "",
            googleSub: payload["sub"],
          },
        });

        // TODO: limit number the props send
        return res.json(user);
      }
    }
  } catch (e) {
    return validationErrorHandler(res, "GOOGLE_REGISTER_FAILED");
  }
  return validationErrorHandler(res, "GOOGLE_REGISTER_FAILED");
};
