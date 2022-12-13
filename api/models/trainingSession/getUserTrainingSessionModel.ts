import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type GetUserTrainingSessionRequestModel = Request<
  { trainingSessionId: number },
  any,
  { trainingSessionId: number; questionId: number; questionAnswerIds: number[] }
>;

export type GetUserTrainingSessionResponseModel = Response<
  {
    id: number;
    finished: boolean;
    trainingId: number;
    trainingName: string;
    correctQuestionCount: number;
    totalQuestionCount: number;
    trainingQuestions: Array<{
      trainingQuestionId: number;
      question: string;
      answerStatus: "correct" | "incorrect" | "not_answered";
    }>;
  },
  commonLocals
>;

export const GetUserTrainingSessionResponseExample: extractResBody<GetUserTrainingSessionResponseModel> =
  {
    id: 5,
    finished: true,
    trainingId: 1000000,
    trainingName: "Init training 1",
    trainingQuestions: [
      {
        trainingQuestionId: 1000000,
        question: "Init question 1",
        answerStatus: "incorrect",
      },
    ],
    correctQuestionCount: 1,
    totalQuestionCount: 3,
  };
