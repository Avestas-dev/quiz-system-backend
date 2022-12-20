import { User } from "@prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";

export type ChangeLikeRequestModel = Request<{ trainingId: number }, any, any>;

export type ChangeLikeResponseModel = Response<
  { liked: boolean },
  { user: User }
>;

export const ChangeLikeResponseExample: extractResBody<ChangeLikeResponseModel> =
  {
    liked: true,
  };
