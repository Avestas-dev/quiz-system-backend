import { Prisma } from "@prisma/client";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  DeleteQuestionAnswerRequestModel,
  DeleteQuestionAnswerResponseModel,
} from "../../../models/answer/deleteQuestionAnswerModel";

export const deleteQuestionAnswer = async (
  req: DeleteQuestionAnswerRequestModel,
  res: DeleteQuestionAnswerResponseModel
) => {
  /* 	#swagger.tags = ['Answer']
        #swagger.description = 'Remove question answer'
        #swagger.security = [{"apiKeyAuth": []}]
              
  */
  const { questionAnswerId } = req.body;

  try {
    const { count } = await prisma.questionAnswer.deleteMany({
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
      return validationErrorHandler(res, "QUESTION_ANSWER_NOT_DELETED");
    }

    return res.json(count);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2025"
    ) {
      return validationErrorHandler(res, "QUESTION_ANSWER_NOT_EXIST");
    } else {
      return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  }
};
