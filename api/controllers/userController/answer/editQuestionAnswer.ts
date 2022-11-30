import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  EditQuestionAnswerRequestModel,
  EditQuestionAnswerResponseModel,
} from "../../../models/answer/editQuestionAnswerModel";

export const editQuestionAnswer = async (
  req: EditQuestionAnswerRequestModel,
  res: EditQuestionAnswerResponseModel
) => {
  /* 	#swagger.tags = ['Answer']
        #swagger.description = 'Edit question answer.'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit question question success.',
            required: true,
            schema: { $ref: "#/definitions/EditQuestionAnswerRequest" }
        }         
  */
  const { answer, isCorrect, questionAnswerId } = req.body;

  try {
    const { count } = await prisma.questionAnswer.updateMany({
      data: {
        answer: answer,
        isCorrect: isCorrect,
      },
      where: {
        id: questionAnswerId,
        question: {
          training: {
            userId: res.locals.user.id,
          },
        },
      },
    });
    if (count === 0) {
      return validationErrorHandler(res, "QUESTION_ANSWER_NOT_UPDATED");
    }
    return res.json({ count: count });
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
