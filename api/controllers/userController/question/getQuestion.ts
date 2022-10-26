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
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Get one question details'
        #swagger.security = [{"apiKeyAuth": []}]
  */

  const { questionId } = req.body;

  try {
    const question = await prisma.question.findFirst({
      where: {
        id: questionId,
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
