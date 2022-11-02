import dayjs from "dayjs";
import * as _ from "lodash";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetTrainingSessionQuestionsRequestModel,
  GetTrainingSessionQuestionsResponseModel,
} from "../../../models/trainingSession/getTrainingSessionQuestionsModel";

export const getTrainingSessionQuestions = async (
  req: GetTrainingSessionQuestionsRequestModel,
  res: GetTrainingSessionQuestionsResponseModel
) => {
  /* 	#swagger.tags = ['Training Session']
        #swagger.description = 'Get all questions for training session that were not answered, and were created after creation of training session.'
        #swagger.security = [{"apiKeyAuth": []}]
  */
  const { trainingSessionId } = req.params;

  try {
    // getting training session, with already answered questions, and all training questions
    const trainingSession = await prisma.trainingSession.findFirst({
      where: {
        id: Number(trainingSessionId),
        Training: {
          OR: [
            { userId: res.locals.user.id },
            {
              visibility: true,
            },
          ],
        },
      },
      include: {
        userAnswer: true,
        Training: {
          include: {
            Question: {
              include: {
                QuestionAnswer: true,
              },
            },
          },
        },
      },
    });
    if (!trainingSession)
      return validationErrorHandler(res, "TRAINING_SESSION_NOT_FOUND");

    // Filter training questions, so that no already answered ones are provided.
    // But keep in mind, that userAnswer can be multiple for one question

    const userAnswer = trainingSession.userAnswer;
    const uniqueAnswersId = _.uniqBy(userAnswer, "questionId").map(
      (e) => e.questionId
    );

    const trainingQuestions = trainingSession.Training.Question;

    const trainingQuestionsFromBeforeTrainingSessionStart =
      trainingQuestions.filter((question) =>
        dayjs(question.CreatedAt).isBefore(trainingSession.CreatedAt)
      );

    const notAnsweredQuestions =
      trainingQuestionsFromBeforeTrainingSessionStart.filter(
        (e) => !uniqueAnswersId.find((w) => w === e.id)
      );

    return res.json({
      questions: notAnsweredQuestions,
      answeredQuestionCount: uniqueAnswersId.length,
      totalQuestionCount:
        trainingQuestionsFromBeforeTrainingSessionStart.length,
    });
  } catch (e) {
    console.log(e);
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
