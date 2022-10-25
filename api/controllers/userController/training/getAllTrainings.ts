import { Request } from "express";
import { prisma } from "../../../helpers/prisma";
import { AuthResponse } from "../../../models/auth/authRequest";
export const getAllTrainings = async (req: Request, res: AuthResponse) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Gets all trainings of all user that have visiblity set to true, and all trainings of logged in user.'
        #swagger.responses[200] = {
        description: 'All trainings received.',
        schema: { $ref: '#/definitions/GetAllTrainingsResponse' 
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
  });
  console.log(allTrainings);
  return res.json(allTrainings);
};
