import dayjs from "dayjs";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetUserTrainingSessionsRequestModel,
  GetUserTrainingSessionsResponseModel,
} from "../../../models/trainingSession/getUserTrainingSessionsModel";

export const getUserTrainingSessions = async (
  req: GetUserTrainingSessionsRequestModel,
  res: GetUserTrainingSessionsResponseModel
) => {
  /* 	#swagger.tags = ['Training Session']
        #swagger.description = 'Get all training sessions done or started by user - it should be used on screen where all training session history is shown - endpoint doesn't contain all details, to get more details use endpoint /training-session/{trainingSessionId} and go to details page on frontend.'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.responses[200] = {
          schema: { $ref: '#/definitions/GetUserTrainingSessionsResponse' }
        }
  */

  try {
    const trainingSessions = await prisma.trainingSession.findMany({
      where: {
        userId: res.locals.user.id,
      },
      include: {
        Training: {
          select: {
            name: true,
            id: true,
            Question: {
              select: {
                id: true,
                question: true,
                CreatedAt: true,
                QuestionAnswer: {
                  select: {
                    id: true,
                    isCorrect: true,
                  },
                },
              },
            },
          },
        },
        userAnswer: {
          select: {
            id: true,
            questionId: true,
            questionAnswerId: true,
          },
        },
      },
    });

    const result = trainingSessions
      .map((tSession) => {
        return {
          id: tSession.id,
          finished: tSession.finished,
          trainingId: tSession.Training.id,
          trainingName: tSession.Training.name,
          trainingQuestions: tSession.Training.Question.filter((question) =>
            dayjs(tSession.CreatedAt).isAfter(question.CreatedAt)
          )
            .map((question) => {
              return {
                trainingQuestionId: question.id,
                question: question.question,
                correctAnswers: question.QuestionAnswer.filter(
                  (qa) => qa.isCorrect
                ).map((questionAnswer) => questionAnswer.id),
                userAnswers: tSession.userAnswer
                  .filter((userAnswer) => userAnswer.questionId === question.id)
                  .map((userAnswer) => userAnswer.questionAnswerId),
              };
            })
            .map((trainingQuestion) => {
              return {
                trainingQuestionId: trainingQuestion.trainingQuestionId,
                question: trainingQuestion.question,
                answerStatus: (trainingQuestion.userAnswers?.length === 0
                  ? "not_answered"
                  : trainingQuestion.correctAnswers.every(
                      (e) =>
                        !!trainingQuestion.userAnswers.find((el) => el === e)
                    ) &&
                    trainingQuestion.userAnswers.length ===
                      trainingQuestion.correctAnswers.length
                  ? "correct"
                  : "incorrect") as "not_answered" | "correct" | "incorrect",
              };
            }),
        };
      })
      .map((e) => ({
        ...e,
        correctQuestionCount: e.trainingQuestions.filter(
          (tq) => tq.answerStatus === "correct"
        ).length,
        totalQuestionCount: e.trainingQuestions.length,
      }));
    res.json(result);
  } catch (e) {
    console.log(e);
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
