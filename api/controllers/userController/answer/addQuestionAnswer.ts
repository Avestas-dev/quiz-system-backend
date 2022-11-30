import { Prisma } from "@prisma/client";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  AddQuestionAnswerRequestModel,
  AddQuestionAnswerResponseModel,
} from "../../../models/answer/addQuestionAnswerModel";

export const addQuestionAnswer = async (
  req: AddQuestionAnswerRequestModel,
  res: AddQuestionAnswerResponseModel
) => {
  /* 	#swagger.tags = ['Answer']
        #swagger.description = 'Add answer for question'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create answer for question request.',
            required: true,
            schema: { $ref: '#/definitions/AddQuestionAnswerRequest' }
        }         
  */
  const { answer, isCorrect, questionId } = req.body;

  try {
    await prisma.questionAnswer.create({
      data: {
        answer: answer,
        isCorrect: isCorrect,
        questionId: questionId,
      },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2003"
    ) {
      return validationErrorHandler(res, "QUESTION_NOT_EXIST");
    } else {
      return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  }
  return res.json();
};
