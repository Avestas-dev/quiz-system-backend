import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type RejectTagRequestModel = Request<any, any, { tagId: number }>;

export type RejectTagResponseModel = Response<any, commonLocals>;

export const RejectTagRequestExample: extractReqBody<RejectTagRequestModel> = {
  tagId: 1,
};
