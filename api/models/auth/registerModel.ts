import { User } from "@prisma/client";
import { Request, Response } from "express";
import {
  extractReqBody,
  extractResBody,
} from "../../helpers/typescriptHelpers";

export type RegisterRequestModel = Request<
  any,
  any,
  {
    email: string;
    password: string;
    passwordRepeated: string;
  }
>;

export type RegisterResponseModel = Response<User, any>;

export const RegisterRequestExample: extractReqBody<RegisterRequestModel> = {
  email: "kamilporeba@hotmail.com",
  password: "Kamil123!",
  passwordRepeated: "Kamil123!",
};
const date = new Date();
export const RegisterResponseExample: extractResBody<RegisterResponseModel> = {
  id: 4,
  email: "kamilporeba1998@gmail.com",
  password: "password",
  refreshToken: "refreshToken",
  passwordResetToken: "resetToken",
  passwordResetDate: date.toISOString() as unknown as Date,
  googleSub: "105081556580525628106",
  isAdmin: false,
  createdAt: date.toISOString() as unknown as Date,
  updatedAt: date.toISOString() as unknown as Date,
};
