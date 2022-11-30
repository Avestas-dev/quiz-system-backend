import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type EndTrainingSessionRequestModel = Request<
  any,
  any,
  {
    trainingId: number;
  }
>;

export type EndTrainingSessionResponseModel = Response<any, commonLocals>;

export const EndTrainingSessionRequestExample: extractReqBody<EndTrainingSessionRequestModel> =
  {
    trainingId: 1,
  };
