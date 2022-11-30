import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type AddUserAnswerRequestModel = Request<
  any,
  any,
  { trainingSessionId: number; questionId: number; questionAnswerIds: number[] }
>;

export type AddUserAnswerResponseModel = Response<any, commonLocals>;

export const AddUserAnswerRequestExample: extractReqBody<AddUserAnswerRequestModel> =
  {
    trainingSessionId: 1,
    questionId: 1,
    questionAnswerIds: [1, 2, 3],
  };
