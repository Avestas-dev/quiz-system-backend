import { Question, User } from "@prisma/client";
import { Request, Response } from "express";

type GetQuestionsRequestBody = {
  trainingId: number;
  withAnswers: boolean;
};

type GetQuestionsLocals = {
  user: User;
};

type GetQuestionsResponseBody = Question[];

export type GetQuestionsRequestModel = Request<
  any,
  any,
  GetQuestionsRequestBody
>;

export type GetQuestionsResponseModel = Response<
  GetQuestionsResponseBody,
  GetQuestionsLocals
>;
