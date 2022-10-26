import { User } from "@prisma/client";
import { Request, Response } from "express";

type AddQuestionAnswerRequestBody = {
  questionId: number;
  answer: string;
  isCorrect: boolean;
};

type AddQuestionAnswerLocals = {
  user: User;
};

export type AddQuestionAnswerRequestModel = Request<
  any,
  any,
  AddQuestionAnswerRequestBody
>;

export type AddQuestionAnswerResponseModel = Response<
  any,
  AddQuestionAnswerLocals
>;
