import { Request } from "express";
import { prisma } from "../../../helpers/prisma";
import { GetAllTrainingsResponseModel } from "../../../models/training/getAllTrainingsModel";
export const getAllTrainings = async (
  req: Request,
  res: GetAllTrainingsResponseModel
) => {
  /* 	
    #swagger.tags = ['Training']
    #swagger.description = 'Gets all trainings of all user that have visiblity set to true, and all trainings of logged in user. Also, retrieve currently active training session.'
    #swagger.security = [{"apiKeyAuth": []}]
    #swagger.parameters['onlyLiked'] = {
            in: 'query',
            description: 'Set to true, if only liked one should be displayed',
            required: false,
    }
    #swagger.parameters['search'] = {
            in: 'query',
            description: 'Set to search query',
            required: false,
    }  
    #swagger.parameters['tags'] = {
            in: 'query',
            description: 'Set tags',
            required: false,
            type: 'array'
    }  
    #swagger.responses[200] = {
      description: 'All trainings received.',
      schema: { $ref: '#/definitions/GetAllTrainingsResponse' }
    }    
  */
  const onlyLiked = req.query?.onlyLiked === "true";
  const searchParam = (req.query?.search as string) || "";
  const tags = req?.query?.tags ? (req.query.tags as string)?.split(",") : [];
  const allTrainings = await prisma.training.findMany({
    where: {
      AND: [
        tags?.length > 0
          ? {
              TagTraining: {
                some: {
                  tag: {
                    tagStatus: 'accepted',
                    name: {
                      in: tags,
                    },
                  },
                },
              },
            }
          : {
              id: {
                gte: 0,
              },
            },
        {
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
      ],
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      TagTraining: {
        include: {
          tag: true,
        },
      },
      LikeTraining: true,
      TrainingSession: {
        select: {
          id: true,
          finished: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          OR: [{ userId: res.locals.user.id }],
          finished: false,
        },
      },
    },
  });

  const filteredTrainings = allTrainings
    .map(({ TrainingSession, LikeTraining, TagTraining, ...al }) => ({
      ...al,
      tagTraining: TagTraining.map((e) => ({
        tagId: e.tagId,
        tagName: e.tag.name,
      })),
      likedTraining: !!LikeTraining.length,
      trainingSession: TrainingSession,
    }))
    .filter((e) => (onlyLiked ? e.likedTraining : true));

  return res.json(filteredTrainings);
};
