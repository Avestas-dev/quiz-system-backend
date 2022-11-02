import { Prisma } from "@prisma/client";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  DeleteQuestionRequestModel,
  DeleteQuestionResponseModel,
} from "../../../models/question/deleteQuestionModel";

export const deleteQuestion = async (
  req: DeleteQuestionRequestModel,
  res: DeleteQuestionResponseModel
) => {
  /* 	#swagger.tags = ['Question']
        #swagger.description = 'Remove question'
        #swagger.security = [{"apiKeyAuth": []}]
        
  */
  const { questionId } = req.body;

  try {
    const { count } = await prisma.question.deleteMany({
      where: {
        id: questionId,
        training: {
          userId: res.locals.user.id,
        },
      },
    });
    if (count === 0) {
      return validationErrorHandler(res, "QUESTION_NOT_DELETED");
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
