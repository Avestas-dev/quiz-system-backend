import { Question, QuestionAnswer } from "@prisma/client";
import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
const date = new Date();

export type GetQuestionRequestModel = Request<
  {
    questionId: string;
  },
  any
>;

export type GetQuestionResponseModel = Response<
  Question & { QuestionAnswer: QuestionAnswer[] },
  commonLocals
>;

export const GetQuestionRequestExample: extractReqBody<GetQuestionRequestModel> =
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
  };
