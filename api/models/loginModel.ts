import { User } from "@prisma/client";
import { Request, Response } from "express";

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginLocals = {
  user: User;
};

export type LoginRequestModel = Request<any, any, LoginRequestBody>;

export type LoginResponseModel = Response<any, LoginLocals>;
