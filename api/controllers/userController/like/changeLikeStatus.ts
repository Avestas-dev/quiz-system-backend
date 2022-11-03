import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  ChangeLikeRequestModel,
  ChangeLikeResponseModel,
} from "../../../models/like/changeLikeStatus";

export const changeLikeStatus = async (
  req: ChangeLikeRequestModel,
  res: ChangeLikeResponseModel
) => {
  /* 	#swagger.tags = ['Likes']
      #swagger.security = [{"apiKeyAuth": []}]
      #swagger.description = 'Training - like if not liked, dislike if liked.'
  */

  try {
    const { trainingId } = req.params;

    const foundLiked = await prisma.likeTraining.findFirst({
      where: {
        trainingId: Number(trainingId),
        userId: res.locals.user.id,
      },
    });

    if (foundLiked) {
      await prisma.likeTraining.deleteMany({
        where: {
          id: foundLiked.id,
        },
      });
      return res.json({ liked: false });
    } else {
      await prisma.likeTraining.create({
        data: {
          userId: res.locals.user.id,
          trainingId: Number(trainingId),
        },
      });
      return res.json({ liked: true });
    }
  } catch (e) {
    console.log(e);
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
