import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationErrorHandler } from "../../helpers/errorHandler";
import { prisma } from "../../helpers/prisma";

export const refreshToken = async (req: Request, res: Response) => {
  /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Get new token using refresh token.'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.responses[200] = {
            description: 'Gets refresh token.',
            schema: { $ref: '#/definitions/RefreshTokenResponse' }
        }
  */
  const refreshToken = req.headers["refresh"] as string;
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return validationErrorHandler(res, "TOKEN_NOT_PROVIDED");
  if (!refreshToken)
    return validationErrorHandler(res, "REFRESH_TOKEN_NOT_PROVIDED");
  try {
    // get id from jwt token
    const decoded = jwt.decode(token) as jwt.JwtPayload & {
      user_id: number;
      iat: number;
      exp: number;
    };

    // finding refresh token of signed user id
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.user_id,
      },
    });

    // checking if tokens in db and send match
    if (refreshToken !== user?.refreshToken)
      return validationErrorHandler(res, "REFRESH_TOKEN_INVALID");

    // generating new token
    const newToken = jwt.sign(
      { user_id: decoded.user_id },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_VALIDATION_TIME,
      }
    );

    // sending new token
    return res.json({ token: newToken });
  } catch (err: any) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
