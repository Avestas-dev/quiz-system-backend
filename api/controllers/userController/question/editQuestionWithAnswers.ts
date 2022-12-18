import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  EditQuestionWithAnswersRequestModel,
  EditQuestionWithAnswersResponseModel,
} from "../../../models/question/editQuestionWithAnswersModel";

export const editQuestionWithAnswers = async (
  req: EditQuestionWithAnswersRequestModel,
  res: EditQuestionWithAnswersResponseModel
) => {
  /* 	#swagger.tags = ['Question']
        #swagger.description = 'Edit question with all answers.'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit question with all answers request.',
            required: true,
            schema: { $ref: "#/definitions/EditQuestionWithAnswersRequest" }
        }         
  */

  const { question, questionId, answers } = req.body;

  try {
    await prisma.question.updateMany({
      where: {
        id: questionId,
      },
      data: {
        question: question,
      },
    });
    const update = async (answer: typeof answers[0]) => {
      await prisma.questionAnswer.update({
        where: {
          id: answer.answerId,
        },
        data: {
          answer: answer.answer,
          isCorrect: answer.isCorrect,
        },
      });
    };
    answers.forEach(update);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
  return res.json({});
};
