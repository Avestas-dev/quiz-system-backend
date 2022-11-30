import { QuestionAnswer } from "@prisma/client";
import { Request, Response } from "express";
import {
  extractReqBody,
  extractResBody,
} from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
const date = new Date();

export type AddQuestionAnswerRequestModel = Request<
  any,
  any,
  {
    questionId: number;
    answer: string;
    isCorrect: boolean;
  }
>;

export type AddQuestionAnswerResponseModel = Response<
  QuestionAnswer,
  commonLocals
>;

export const AddQuestionAnswerRequestExample: extractReqBody<AddQuestionAnswerRequestModel> =
  {
    questionId: 1,
    answer: "Sample answer",
    isCorrect: true,
  };

export const AddQuestionAnswerResponseExample: extractResBody<AddQuestionAnswerResponseModel> =
  {
    answer: "answer",
    CreatedAt: date.toISOString() as unknown as Date,
    id: 1,
    isCorrect: true,
    questionId: 1,
    UpdatedAt: date.toISOString() as unknown as Date,
  };
