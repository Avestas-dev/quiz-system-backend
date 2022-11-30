import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type UnlockUserRequestModel = Request<any, any, { userId: number }>;

export type UnlockUserResponseModel = Response<any, commonLocals>;

export const UnlockUserRequestExample: extractReqBody<UnlockUserRequestModel> =
  { userId: 1 };
