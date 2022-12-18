import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type EditQuestionWithAnswersRequestModel = Request<
  any,
  any,
  {
    question: string;
    questionId: number;
    answers: {
      answerId: number;

      answer: string;
      isCorrect: boolean;
    }[];
  }
>;

export type EditQuestionWithAnswersResponseModel = Response<any, commonLocals>;

export const EditQuestionWithAnswersRequestExample: extractReqBody<EditQuestionWithAnswersRequestModel> =
  {
    question: "Sample question",
    questionId: 1,
    answers: [
      {
        answer: "Sample answer",
        isCorrect: true,
        answerId: 1,
      },
      {
        answer: "Sample answer 2",
        isCorrect: false,
        answerId: 1,
      },
    ],
  };
