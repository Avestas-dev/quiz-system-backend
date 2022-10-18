import { Request, Response } from "express";

type RegisterRequestBody = {
  email: string;
  password: string;
  passwordRepeated: string;
};

export type RegisterRequestModel = Request<any, any, RegisterRequestBody>;

export type RegisterResponseModel = Response;
