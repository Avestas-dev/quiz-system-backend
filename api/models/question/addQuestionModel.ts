import { User } from "@prisma/client";
import { Request, Response } from "express";

type AddQuestionRequestBody = {
  question: string;
  trainingId: number;
};

type AddQuestionLocals = {
  user: User;
};

export type AddQuestionRequestModel = Request<any, any, AddQuestionRequestBody>;

export type AddQuestionResponseModel = Response<any, AddQuestionLocals>;
