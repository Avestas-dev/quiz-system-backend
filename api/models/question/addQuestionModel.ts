import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type AddQuestionRequestModel = Request<
  any,
  any,
  {
    question: string;
    trainingId: number;
  }
>;

export type AddQuestionResponseModel = Response<any, commonLocals>;

export const AddQuestionRequestExample: extractReqBody<AddQuestionRequestModel> =
  {
    question: "Sample question",
    trainingId: 1,
  };
