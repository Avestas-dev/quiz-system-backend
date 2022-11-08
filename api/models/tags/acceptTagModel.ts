import { User } from ".prisma/client";
import { Request, Response } from "express";

export type AcceptTagRequestModel = Request<any, any, { tagId: number }>;

export type AcceptTagResponseModel = Response<any, { user: User }>;
