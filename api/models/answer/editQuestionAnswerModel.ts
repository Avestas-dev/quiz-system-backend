import { User } from "@prisma/client";
import { Request, Response } from "express";

type EditQuestionAnswerRequestBody = {
  questionAnswerId: number;
  answer: string;
  isCorrect: boolean;
};

type EditQuestionAnswerLocals = {
  user: User;
};

export type EditQuestionAnswerRequestModel = Request<
  any,
  any,
  EditQuestionAnswerRequestBody
>;

export type EditQuestionAnswerResponseModel = Response<
  any,
  EditQuestionAnswerLocals
>;
