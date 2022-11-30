import { User } from "@prisma/client";
import { Request, Response } from "express";
import {
  extractReqBody,
  extractResBody,
} from "../../helpers/typescriptHelpers";

export type RegisterGoogleRequestModel = Request<
  any,
  any,
  {
    tokenId: string;
  }
>;

export type RegisterGoogleResponseModel = Response<User, any>;

export const RegisterGoogleRequestExample: extractReqBody<RegisterGoogleRequestModel> =
  { tokenId: "tokenId" };
const date = new Date();
export const RegisterGoogleResponseExample: extractResBody<RegisterGoogleResponseModel> =
  {
    id: 4,
    email: "kamilporeba1998@gmail.com",
    password: "",
    refreshToken: "refreshToken",
    passwordResetToken: "resetToken",
    passwordResetDate: date.toISOString() as unknown as Date,
    googleSub: "105081556580525628106",
    isAdmin: false,
    CreatedAt: date.toISOString() as unknown as Date,
    UpdatedAt: date.toISOString() as unknown as Date,
  };
