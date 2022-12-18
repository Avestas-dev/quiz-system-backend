import { Request } from "express";
import { ProfileResponseModel } from "../../models/profileModel";

export const profile = async (req: Request, res: ProfileResponseModel) => {
  /* 	
      #swagger.tags = ['Auth']
      #swagger.description = 'Get user profile from token'
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.responses[200] = {
          description: 'User profile.',
          schema: { $ref: '#/definitions/ProfileResponse' }
      }
  */
  return res.json({
    id: res.locals.user.id,
    email: res.locals.user.email,
    isAdmin: res.locals.user.isAdmin,
  });
};
