import { User } from ".prisma/client";
import { Request, Response } from "express";

export type EditTagRequestModel = Request<
  any,
  any,
  { name: string; tagId: number }
>;

export type EditTagResponseModel = Response<any, { user: User }>;
