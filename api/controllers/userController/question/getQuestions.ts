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
  /* 	#swagger.tags = ['Question']
        #swagger.description = 'Get all questions for training, when withAnswers=true then also includes answers. This endpoint should be used when browsing list of all trainings.'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['withAnswers'] = {
            in: 'query',
            description: 'Set to true when questions should include answers.',
        }  
        #swagger.responses[200] = {
          description: 'All questions received.',
          schema: { $ref: '#/definitions/GetQuestionsResponse' }
        }
  */

  const { trainingId } = req.params;
  const { withAnswers } = req.query;

  try {
    const questions = await prisma.question.findMany({
      where: {
        training: {
          id: Number(trainingId),
          OR: [
            { userId: res.locals.user.id },
            {
              visibility: true,
            },
          ],
        },
      },
      include: {
        QuestionAnswer: withAnswers === "true",
      },
    });
    return res.json(questions);
  } catch (e) {
    console.log(e);
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
