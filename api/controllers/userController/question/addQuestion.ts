import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  AddQuestionRequestModel,
  AddQuestionResponseModel,
} from "../../../models/question/addQuestionModel";

export const addQuestion = async (
  req: AddQuestionRequestModel,
  res: AddQuestionResponseModel
) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Create question'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create question request.',
            required: true,
            schema: { $ref: "#/definitions/AddQuestionRequest" }
        }         
  */

  const { question, trainingId } = req.body;

  try {
    await prisma.question.create({
      data: {
        question: question,
        trainingId: trainingId,
      },
    });
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
  return res.json({});
};
