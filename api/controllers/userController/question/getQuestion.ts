import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetQuestionRequestModel,
  GetQuestionResponseModel,
} from "../../../models/question/getQuestionModel";

export const getQuestion = async (
  req: GetQuestionRequestModel,
  res: GetQuestionResponseModel
) => {
  /* 	#swagger.tags = ['Question']
        #swagger.description = 'Get one question details, with all answers.'
        #swagger.security = [{"apiKeyAuth": []}]
          #swagger.responses[200] = {
          description: 'All questions received.',
          schema: { $ref: '#/definitions/GetQuestionResponse' }
        }
  */
  const { questionId } = req.params;
  try {
    const question = await prisma.question.findFirst({
      where: {
        id: Number(questionId),
        training: {
          OR: [{ userId: res.locals.user.id }, { visibility: true }],
        },
      },
      include: {
        QuestionAnswer: true,
      },
    });
    if (!question) {
      return validationErrorHandler(res, "QUESTION_NOT_EXIST");
    }
    return res.json(question);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
