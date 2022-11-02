import { User } from "@prisma/client";
import { Request, Response } from "express";

export type AddUserAnswerRequestModel = Request<
  any,
  any,
  { trainingSessionId: number; questionId: number; questionAnswerIds: number[] }
>;

export type AddUserAnswerResponseModel = Response<any, { user: User }>;
