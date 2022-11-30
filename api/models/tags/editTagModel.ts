import { User } from ".prisma/client";
import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";

export type EditTagRequestModel = Request<
  any,
  any,
  { name: string; tagId: number }
>;

export type EditTagResponseModel = Response<any, { user: User }>;

export const EditTagRequestExample: extractReqBody<EditTagRequestModel> = {
  name: "newTagName",
  tagId: 1,
};
