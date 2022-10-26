import { User } from "@prisma/client";
import { Request, Response } from "express";

type EditQuestionRequestBody = {
  question: string;
  questionId: number;
};

type EditQuestionLocals = {
  user: User;
};

export type EditQuestionRequestModel = Request<
  any,
  any,
  EditQuestionRequestBody
>;

export type EditQuestionResponseModel = Response<any, EditQuestionLocals>;
