import { Prisma } from ".prisma/client";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  AddUserAnswerRequestModel,
  AddUserAnswerResponseModel,
} from "../../../models/userAnswer/addUserAnswerModel";

export const addUserAnswer = async (
  req: AddUserAnswerRequestModel,
  res: AddUserAnswerResponseModel
) => {
  /* 	#swagger.tags = ['Question']
        #swagger.description = 'Create question'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add answer to given question in given training session.',
            required: true,
            schema: { $ref: "#/definitions/AddUserAnswerRequest" }
        }         
  */

  const request = req.body;

  try {
    const foundQuestionAnswersinTrainingSession =
      await prisma.userAnswer.findFirst({
        where: {
          trainingSessionId: request?.trainingSessionId,
          questionId: request?.questionId,
        },
      });
    if (foundQuestionAnswersinTrainingSession) {
      return validationErrorHandler(res, "QUESTION_ANSWERED_ALREADY");
    }

    // add check if every questionAnswerId belongs to same question
    const questionAnswersIdsForQuestion = await prisma.question.findMany({
      where: {
        id: request.questionId,
      },
      select: {
        QuestionAnswer: {
          select: {
            id: true,
          },
        },
      },
    });

    const questionAnswersIdForQuestion = questionAnswersIdsForQuestion.flatMap(
      (it) => it.QuestionAnswer.map((e) => e.id)
    );

    // if selected question answer ids are not for given question, then return error
    const answerValidationPassed =
      questionAnswersIdForQuestion.filter((e) =>
        request.questionAnswerIds.find((t) => e === t)
      ).length === request.questionAnswerIds.length;

    if (!answerValidationPassed)
      return validationErrorHandler(
        res,
        "QUESTION_ANSWER_NOT_FOR_GIVEN_QUESTION"
      );

    await prisma.userAnswer.createMany({
      data: request?.questionAnswerIds.map((questionAnswerId) => {
        return {
          trainingSessionId: request.trainingSessionId,
          questionId: request.questionId,
          questionAnswerId: questionAnswerId,
        };
      }),
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2003"
    ) {
      if (e?.meta?.field_name === "UserAnswer_trainingSessionId_fkey (index)") {
        return validationErrorHandler(res, "TRAINING_SESSION_NOT_FOUND");
      }
      if (e?.meta?.field_name === "UserAnswer_questionId_fkey (index)") {
        return validationErrorHandler(res, "QUESTION_NOT_EXIST");
      }
      if (e?.meta?.field_name === "UserAnswer_questionAnswerId_fkey (index)") {
        return validationErrorHandler(res, "QUESTION_ANSWER_NOT_EXIST");
      }
    }
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
  return res.json({});
};
