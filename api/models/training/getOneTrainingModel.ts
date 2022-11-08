import { Training, User } from "@prisma/client";
import { Request, Response } from "express";

type GetOneTrainingRequestParams = {
  trainingId: string;
};

type Locals = {
  user: User;
};

type GetOneTrainingResponseBody = Training & { likedTraining: boolean };

export type GetOneTrainingRequestModel = Request<
  GetOneTrainingRequestParams,
  any
>;

export type GetOneTrainingsResponseModel = Response<
  GetOneTrainingResponseBody,
  Locals
>;
