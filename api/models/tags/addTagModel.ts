import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";

export type AddTagRequestModel = Request<any, any, { name: string }>;

export type AddTagResponseModel = Response<any, any>;

export const AddTagRequestExample: extractReqBody<AddTagRequestModel> = {
  name: "tagName",
};
