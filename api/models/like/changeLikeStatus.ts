import { User } from "@prisma/client";
import { Request, Response } from "express";

export type ChangeLikeRequestModel = Request<{ trainingId: number }, any, any>;

export type ChangeLikeResponseModel = Response<
  { liked: boolean },
  { user: User }
>;
