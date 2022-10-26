import { Question, User } from "@prisma/client";
import { Request, Response } from "express";

type GetQuestionRequestBody = {
  questionId: number;
};

type GetQuestionLocals = {
  user: User;
};

type GetQuestionResponseBody = Question;

export type GetQuestionRequestModel = Request<any, any, GetQuestionRequestBody>;

export type GetQuestionResponseModel = Response<
  GetQuestionResponseBody,
  GetQuestionLocals
>;
