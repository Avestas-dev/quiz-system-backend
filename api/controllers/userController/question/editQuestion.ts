import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  EditQuestionRequestModel,
  EditQuestionResponseModel,
} from "../../../models/question/editQuestionModel";

export const editQuestion = async (
  req: EditQuestionRequestModel,
  res: EditQuestionResponseModel
) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Edit question.'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit question success.',
            required: true,
            schema: { $ref: "#/definitions/EditQuestionRequest" }
        }         
  */

  const { question, questionId } = req.body;

  try {
    const { count } = await prisma.question.updateMany({
      data: {
        question: question,
      },
      where: {
        id: questionId,
        training: {
          userId: res.locals.user.id,
        },
      },
    });
    if (count === 0) {
      return validationErrorHandler(res, "QUESTION_NOT_UPDATED");
    }
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
  return res.json({});
};
