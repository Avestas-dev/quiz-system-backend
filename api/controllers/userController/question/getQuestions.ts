import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetQuestionsRequestModel,
  GetQuestionsResponseModel,
} from "../../../models/question/getQuestionsModel";

export const getQuestions = async (
  req: GetQuestionsRequestModel,
  res: GetQuestionsResponseModel
) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Get all questions for training'
        #swagger.security = [{"apiKeyAuth": []}]
  */

  const { trainingId, withAnswers } = req.body;

  try {
    const questions = await prisma.question.findMany({
      where: {
        training: {
          id: trainingId,
          OR: [
            { userId: res.locals.user.id },
            {
              visibility: true,
            },
          ],
        },
      },
      include: {
        QuestionAnswer: !!withAnswers,
      },
    });
    return res.json(questions);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
