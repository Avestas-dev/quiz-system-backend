import { Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
export type RefreshTokenResponseModel = Response<
  { token: string },
  commonLocals
>;

export const RefreshTokenResponseExample: extractResBody<RefreshTokenResponseModel> =
  {
    token: "token",
  };
