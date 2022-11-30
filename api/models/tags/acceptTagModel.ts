import { User } from ".prisma/client";
import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";

export type AcceptTagRequestModel = Request<any, any, { tagId: number }>;

export type AcceptTagResponseModel = Response<any, { user: User }>;

export const AcceptTagRequestExample: extractReqBody<AcceptTagRequestModel> = {
  tagId: 1,
};
