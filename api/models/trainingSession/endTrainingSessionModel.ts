import { User } from "@prisma/client";
import { Request, Response } from "express";

type EndTrainingSessionModel = {
  trainingId: number;
};

type Locals = {
  user: User;
};

export type EndTrainingSessionRequestModel = Request<
  any,
  any,
  EndTrainingSessionModel
>;

export type EndTrainingSessionResponseModel = Response<any, Locals>;
