import { User } from ".prisma/client";
import { Request, Response } from "express";

export type UnlockUserRequestModel = Request<any, any, { userId: number }>;

export type UnlockUserResponseModel = Response<any, { user: User }>;
