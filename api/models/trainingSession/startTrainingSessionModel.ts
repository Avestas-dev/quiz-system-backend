import { Request, Response } from "express";
import {
  extractReqBody,
  extractResBody,
} from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type StartTrainingSessionRequestModel = Request<
  any,
  any,
  {
    trainingId: number;
  }
>;

export type StartTrainingSessionResponseModel = Response<
  { trainingSessionId: number },
  commonLocals
>;

export const StartTrainingSessionRequestExample: extractReqBody<StartTrainingSessionRequestModel> =
  {
    trainingId: 1,
  };

export const StartTrainingSessionResponseExample: extractResBody<StartTrainingSessionResponseModel> =
  {
    trainingSessionId: 1,
  };
