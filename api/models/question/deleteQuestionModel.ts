import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type DeleteQuestionRequestModel = Request<
  any,
  any,
  {
    questionId: number;
  }
>;

export type DeleteQuestionResponseModel = Response<any, commonLocals>;

export const DeleteQuestionRequestExample: extractReqBody<DeleteQuestionRequestModel> =
  {
    questionId: 1,
  };
