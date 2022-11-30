import { Request, Response } from "express";
import {
  extractReqBody,
  extractResBody,
} from "../../helpers/typescriptHelpers";

export type LoginRequestModel = Request<
  any,
  any,
  { email: string; password: string }
>;

export type LoginResponseModel = Response<
  {
    email: string;
    token: string;
    refreshToken: string;
  },
  any
>;

export const LoginRequestExample: extractReqBody<LoginRequestModel> = {
  email: "kamilporeba@hotmail.com",
  password: "Kamil123!",
};

export const LoginResponseExample: extractResBody<LoginResponseModel> = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE2NjYxMDQzMTIsImV4cCI6MTc1MjEwNDMxMn0.H7E3TQPh8Nc0O5JWqPyMfRNHYoTPy57kc8z-2IJd0cc",
  refreshToken: "5f3c44c9-eac1-4ffd-a112-ae5a1fe38fed",
  email: "kamilporeba@hotmail.com",
};
