import { User } from ".prisma/client";
import { Request, Response } from "express";

export type BlockUserRequestModel = Request<
  any,
  any,
  { userId: number; blockedTo: Date }
>;

export type BlockUserResponseModel = Response<any, { user: User }>;
