import { User } from "@prisma/client";
import { Request, Response } from "express";

type DeleteQuestionRequestBody = {
  questionId: number;
};

type DeleteQuestionLocals = {
  user: User;
};

export type DeleteQuestionRequestModel = Request<
  any,
  any,
  DeleteQuestionRequestBody
>;

export type DeleteQuestionResponseModel = Response<any, DeleteQuestionLocals>;
