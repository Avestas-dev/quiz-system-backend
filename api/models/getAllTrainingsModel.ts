import { Training, User } from "@prisma/client";
import { Request, Response } from "express";

type GetAllTrainingsRequestBody = {
  email: string;
  password: string;
};

type Locals = {
  user: User;
};

type GetAllTrainingsResponseBody = Training;

export type GetAllTrainingsRequestModel = Request<
  any,
  any,
  GetAllTrainingsRequestBody
>;

export type GetAllTrainingsResponseModel = Response<
  GetAllTrainingsResponseBody,
  Locals
>;
