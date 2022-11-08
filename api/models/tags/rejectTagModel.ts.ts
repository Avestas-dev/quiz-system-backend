import { User } from ".prisma/client";
import { Request, Response } from "express";

export type RejectTagRequestModel = Request<any, any, { tagId: number }>;

export type RejectTagResponseModel = Response<any, { user: User }>;
