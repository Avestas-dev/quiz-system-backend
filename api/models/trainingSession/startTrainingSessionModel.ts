import { User } from "@prisma/client";
import { Request, Response } from "express";

type StartTrainingSessionRequestBody = {
  trainingId: number;
};

type Locals = {
  user: User;
};

export type StartTrainingSessionRequestModel = Request<
  any,
  any,
  StartTrainingSessionRequestBody
>;

export type StartTrainingSessionResponseModel = Response<any, Locals>;
