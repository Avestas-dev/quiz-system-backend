import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type ResetPasswordRequestModel = Request<
  any,
  any,
  {
    email: string;
    resetGUID: string;
    password: string;
    passwordRepeated: string;
  }
>;
export type ResetPasswordResponseModel = Response<any, commonLocals>;

export const ResetPasswordRequestExample: extractReqBody<ResetPasswordRequestModel> =
  {
    email: "kamilporeba@hotmail.com",
    resetGUID: "e31ace7a-99fd-45e1-91c7-855e02d54983",
    password: "Kamil123!",
    passwordRepeated: "Kamil123!",
  };
