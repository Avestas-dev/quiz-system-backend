import { Question, QuestionAnswer } from "@prisma/client";
import { Request, Response } from "express";
import {
  extractReqBody,
  extractResBody,
} from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
const date = new Date();

export type GetQuestionsRequestModel = Request<
  any,
  any,
  {
    trainingId: number;
    withAnswers: boolean;
  }
>;

export type GetQuestionsResponseModel = Response<
  (Question & { QuestionAnswer: QuestionAnswer[] })[],
  commonLocals
>;

export const GetQuestionsRequestExample: extractReqBody<GetQuestionsRequestModel> =
  {
    trainingId: 1,
    withAnswers: true,
  };

export const GetQuestionsResponseExample: extractResBody<GetQuestionsResponseModel> =
  [
    {
      id: 1,
      question: "Test question",
      trainingId: 1,
      CreatedAt: date.toISOString() as unknown as Date,
      UpdatedAt: date.toISOString() as unknown as Date,
      QuestionAnswer: [
        {
          id: 1,
          questionId: 1,
          answer: "sample answer",
          isCorrect: true,
          CreatedAt: date.toISOString() as unknown as Date,
          UpdatedAt: date.toISOString() as unknown as Date,
        },
      ],
    },
  ];
