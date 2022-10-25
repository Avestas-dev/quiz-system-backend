import { User } from "@prisma/client";
import { Request, Response } from "express";

type DeleteTrainingRequestBody = {
  trainingId: number;
};

type Locals = {
  user: User;
};

export type DeleteTrainingRequestModel = Request<
  any,
  any,
  DeleteTrainingRequestBody
>;

export type DeleteTrainingsResponseModel = Response<any, Locals>;
