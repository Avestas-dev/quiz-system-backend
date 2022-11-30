import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type EditQuestionAnswerRequestModel = Request<
  any,
  any,
  {
    questionAnswerId: number;
    answer: string;
    isCorrect: boolean;
  }
>;

export type EditQuestionAnswerResponseModel = Response<
  { count: number },
  commonLocals
>;

export const EditQuestionAnswerRequestExample: extractReqBody<EditQuestionAnswerRequestModel> =
  {
    answer: "Sample answer",
    isCorrect: true,
    questionAnswerId: 1,
  };
