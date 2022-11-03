import { Request } from "express";
import { prisma } from "../../../helpers/prisma";
import { AuthResponse } from "../../../models/auth/authRequest";
export const getAllTrainings = async (req: Request, res: AuthResponse) => {
  /* 	
    #swagger.tags = ['Training']
    #swagger.description = 'Gets all trainings of all user that have visiblity set to true, and all trainings of logged in user.'
    #swagger.security = [{"apiKeyAuth": []}]
    #swagger.responses[200] = {
      description: 'All trainings received.',
      schema: { $ref: '#/definitions/GetAllTrainingsResponse' }
    }    
  */
  const allTrainings = await prisma.training.findMany({
    where: {
      OR: [
        {
          userId: res.locals.user.id,
        },
        { visibility: true },
      ],
    },
    include: {
      TagTraining: {
        include: {
          tag: true,
        },
      },
    },
  });
  return res.json(
    allTrainings.map((al) => ({
      ...al,
      TagTraining: al.TagTraining.map((e) => ({
        tagId: e.tagId,
        tagName: e.tag.name,
      })),
    }))
  );
};
