import { Training, User } from "@prisma/client";
import { Request, Response } from "express";

type GetOneTrainingRequestBody = {
  trainingId: number;
};

type Locals = {
  user: User;
};

type GetOneTrainingResponseBody = Training;

export type GetOneTrainingRequestModel = Request<
  any,
  any,
  GetOneTrainingRequestBody
>;

export type GetOneTrainingsResponseModel = Response<
  GetOneTrainingResponseBody,
  Locals
>;
