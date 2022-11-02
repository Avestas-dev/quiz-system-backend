import { Question, User } from "@prisma/client";
import { Request, Response } from "express";

type GetQuestionRequestParams = {
  questionId: string;
};

type GetQuestionLocals = {
  user: User;
};

type GetQuestionResponseBody = Question;

export type GetQuestionRequestModel = Request<GetQuestionRequestParams, any>;

export type GetQuestionResponseModel = Response<
  GetQuestionResponseBody,
  GetQuestionLocals
>;
