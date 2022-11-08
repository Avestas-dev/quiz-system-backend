import { Request } from "express";
import { prisma } from "../../../helpers/prisma";
import { AuthResponse } from "../../../models/auth/authRequest";
export const getAllTrainings = async (req: Request, res: AuthResponse) => {
  /* 	
    #swagger.tags = ['Training']
    #swagger.description = 'Gets all trainings of all user that have visiblity set to true, and all trainings of logged in user.'
    #swagger.security = [{"apiKeyAuth": []}]
     #swagger.parameters['onlyLiked'] = {
            in: 'query',
            description: 'Set to true, if only liked one should be displayed',
            required: true,
    }
    #swagger.parameters['search'] = {
            in: 'query',
            description: 'Set to search query',
            required: false,
    }  
    #swagger.responses[200] = {
      description: 'All trainings received.',
      schema: { $ref: '#/definitions/GetAllTrainingsResponse' }
    }    
  */
  const onlyLiked = req.query?.onlyLiked === "true";
  const searchParam = (req.query?.search as string) || "";
  const allTrainings = await prisma.training.findMany({
    where: {
      OR: [
        {
          userId: res.locals.user.id,
          name: searchParam
            ? {
                search: searchParam,
              }
            : undefined,
        },
        {
          visibility: true,
          name: searchParam
            ? {
                search: searchParam,
              }
            : undefined,
        },
      ],
    },
    include: {
      TagTraining: {
        include: {
          tag: true,
        },
      },
      LikeTraining: true,
    },
  });

  const filteredTrainings = allTrainings
    .map(({ LikeTraining, TagTraining, ...al }) => ({
      ...al,
      tagTraining: TagTraining.map((e) => ({
        tagId: e.tagId,
        tagName: e.tag.name,
      })),
      likedTraining: !!LikeTraining.length,
    }))
    .filter((e) => (onlyLiked ? e.likedTraining : true));

  return res.json(filteredTrainings);
};
