import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type EditQuestionRequestModel = Request<
  any,
  any,
  {
    question: string;
    questionId: number;
  }
>;

export type EditQuestionResponseModel = Response<any, commonLocals>;

export const EditQuestionRequestExample: extractReqBody<EditQuestionRequestModel> =
  {
    questionId: 1,
    question: "Sample question",
  };
