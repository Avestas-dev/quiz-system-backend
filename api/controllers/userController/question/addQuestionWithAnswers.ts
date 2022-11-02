import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  AddQuestionWithAnswersRequestModel,
  AddQuestionWithAnswersResponseModel,
} from "../../../models/question/addQuestionWithAnswersModel";

export const addQuestionWithAnswers = async (
  req: AddQuestionWithAnswersRequestModel,
  res: AddQuestionWithAnswersResponseModel
) => {
  /* 	#swagger.tags = ['Question']
        #swagger.description = 'Create question with answers'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create question with answers request.',
            required: true,
            schema: { $ref: "#/definitions/AddQuestionWithAnswersRequest" }
        }         
  */

  const { question, trainingId, answers } = req.body;

  // TODO: add max 4 or max config value of items per question
  try {
    await prisma.question.create({
      data: {
        question: question,
        trainingId: trainingId,
        QuestionAnswer: {
          createMany: {
            data: answers,
          },
        },
      },
    });
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
  return res.json({});
};
