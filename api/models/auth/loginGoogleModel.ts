import { Request, Response } from "express";
import {
  extractReqBody,
  extractResBody,
} from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
import { LoginResponseModel } from "./loginModel";

export type LoginGoogleRequestModel = Request<
  any,
  any,
  {
    tokenId: string;
  }
>;

export type LoginGoogleResponseModel = Response<
  extractResBody<LoginResponseModel>,
  commonLocals
>;

export const LoginGoogleRequestExample: extractReqBody<LoginGoogleRequestModel> =
  {
    tokenId: "token",
  };

export const LoginGoogleResponseExample: extractResBody<LoginGoogleResponseModel> =
  {
    email: "kamilporeba@hotmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE2NjYxMDQzMTIsImV4cCI6MTc1MjEwNDMxMn0.H7E3TQPh8Nc0O5JWqPyMfRNHYoTPy57kc8z-2IJd0cc",
    refreshToken: "5f3c44c9-eac1-4ffd-a112-ae5a1fe38fed",
    userId: 1,
    isAdmin: true,
  };
