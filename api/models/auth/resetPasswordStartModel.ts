import { Request } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";

export type ResetPasswordStartRequestModel = Request<
  any,
  any,
  { email: string }
>;

export const ResetPasswordStartRequestExample: extractReqBody<ResetPasswordStartRequestModel> =
  {
    email: "kamilporeba@hotmail.com",
  };
