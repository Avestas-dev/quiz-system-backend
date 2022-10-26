import { User } from "@prisma/client";
import { Request, Response } from "express";

type AddQuestionWithAnswersRequestBody = {
  question: string;
  trainingId: number;
  answers: {
    answer: string;
    isCorrect: boolean;
  }[];
};

type AddQuestionWithAnswersLocals = {
  user: User;
};

export type AddQuestionWithAnswersRequestModel = Request<
  any,
  any,
  AddQuestionWithAnswersRequestBody
>;

export type AddQuestionWithAnswersResponseModel = Response<
  any,
  AddQuestionWithAnswersLocals
>;
