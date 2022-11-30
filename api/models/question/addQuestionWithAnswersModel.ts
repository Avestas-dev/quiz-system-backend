import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type AddQuestionWithAnswersRequestModel = Request<
  any,
  any,
  {
    question: string;
    trainingId: number;
    answers: {
      answer: string;
      isCorrect: boolean;
    }[];
  }
>;

export type AddQuestionWithAnswersResponseModel = Response<any, commonLocals>;

export const AddQuestionWithAnswersRequestExample: extractReqBody<AddQuestionWithAnswersRequestModel> =
  {
    question: "Sample question",
    trainingId: 1,
    answers: [
      {
        answer: "Sample answer",
        isCorrect: true,
      },
      {
        answer: "Sample answer 2",
        isCorrect: false,
      },
    ],
  };
