import dayjs from "dayjs";
import { validationErrorHandler } from "../../../helpers/errorHandler";
import { prisma } from "../../../helpers/prisma";
import {
  GetUserTrainingSessionRequestModel,
  GetUserTrainingSessionResponseModel,
} from "../../../models/trainingSession/getUserTrainingSessionModel";

export const getUserTrainingSession = async (
  req: GetUserTrainingSessionRequestModel,
  res: GetUserTrainingSessionResponseModel
) => {
  /* 	#swagger.tags = ['Training Session']
        #swagger.description = 'Get single training session with all the details for it'
        #swagger.security = [{"apiKeyAuth": []}]
        #swagger.responses[200] = {
          schema: { $ref: '#/definitions/GetUserTrainingSessionResponse' }
        }
  */

  const { trainingSessionId } = req.params;

  try {
    const tSession = await prisma.trainingSession.findFirst({
      where: {
        userId: res.locals.user.id,
        id: Number(trainingSessionId),
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
                createdAt: true,
                QuestionAnswer: {
                  select: {
                    id: true,
                    answer: true,
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
    if (!tSession)
      return validationErrorHandler(res, "TRAINING_SESSION_NOT_FOUND");

    const result = {
      id: tSession.id,
      finished: tSession.finished,
      trainingId: tSession.Training.id,
      trainingName: tSession.Training.name,
      trainingQuestions: tSession.Training.Question.filter((question) =>
        dayjs(tSession.createdAt).isAfter(question.createdAt)
      )
        .map((question) => {
          return {
            trainingQuestionId: question.id,
            question: question.question,
            answers: question.QuestionAnswer,
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
            ...trainingQuestion,
            trainingQuestionId: trainingQuestion.trainingQuestionId,
            question: trainingQuestion.question,
            answerStatus: (trainingQuestion.userAnswers?.length === 0
              ? "not_answered"
              : trainingQuestion.correctAnswers.every(
                  (e) => !!trainingQuestion.userAnswers.find((el) => el === e)
                ) &&
                trainingQuestion.userAnswers.length ===
                  trainingQuestion.correctAnswers.length
              ? "correct"
              : "incorrect") as "not_answered" | "correct" | "incorrect",
          };
        }),
    };

    const resultWithCorrectQuestionCount = {
      ...result,
      correctQuestionCount: result.trainingQuestions.filter(
        (tq) => tq.answerStatus === "correct"
      ).length,
      totalQuestionCount: result.trainingQuestions.length,
    };

    res.json(resultWithCorrectQuestionCount);
  } catch (e) {
    return validationErrorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};
