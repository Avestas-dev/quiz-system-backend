import { User } from "@prisma/client";
import { Request, Response } from "express";

type ResetPasswordStartRequest = {
  email: string;
};

type ResetPasswordRequest = {
  email: string;
  resetGUID: string;
  password: string;
  passwordRepeated: string;
};

type ResetLocals = {
  user: User;
};

export type ResetPasswordStartRequestModel = Request<
  any,
  any,
  ResetPasswordStartRequest
>;

export type ResetPasswordRequestModel = Request<any, any, ResetPasswordRequest>;
export type ResetPasswordResponseModel = Response<any, ResetLocals>;
