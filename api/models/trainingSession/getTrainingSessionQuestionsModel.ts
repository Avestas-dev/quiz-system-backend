import { Question, QuestionAnswer } from "@prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type GetTrainingSessionQuestionsRequestModel = Request<
  { trainingSessionId: number },
  any,
  any
>;

export type GetTrainingSessionQuestionsResponseModel = Response<
  {
    questions: (Question & {
      questionAnswer: QuestionAnswer[];
    })[];
    answeredQuestionCount: number;
    totalQuestionCount: number;
  },
  commonLocals
>;

const date = new Date();
export const GetTrainingSessionQuestionsResponseExample: extractResBody<GetTrainingSessionQuestionsResponseModel> =
  {
    questions: [
      {
        questionAnswer: [],
        id: 999999,
        question: "User Question 1",
        trainingId: 1000000,
        createdAt: date.toISOString() as unknown as Date,
        updatedAt: date.toISOString() as unknown as Date,
      },
      {
        questionAnswer: [],
        id: 34,
        question: "Sample question",
        trainingId: 1000000,
        createdAt: date.toISOString() as unknown as Date,
        updatedAt: date.toISOString() as unknown as Date,
      },
    ],
    answeredQuestionCount: 0,
    totalQuestionCount: 5,
  };
