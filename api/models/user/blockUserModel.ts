import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type BlockUserRequestModel = Request<
  any,
  any,
  { userId: number; blockedTo: Date }
>;

export type BlockUserResponseModel = Response<any, commonLocals>;

const date = new Date();
export const BlockUserRequestExample: extractReqBody<BlockUserRequestModel> = {
  userId: 1,
  blockedTo: date.toISOString() as unknown as Date,
};
