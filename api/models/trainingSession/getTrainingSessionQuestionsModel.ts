import { Question, QuestionAnswer, User } from "@prisma/client";
import { Request, Response } from "express";

type GetTrainingSessionQuestionsRequestBody = {};

type GetTrainingSessionQuestionsLocals = {
  user: User;
};

type GetTrainingSessionQuestionsResponseBody = {
  questions: (Question & {
    QuestionAnswer: QuestionAnswer[];
  })[];
  answeredQuestionCount: number;
  totalQuestionCount: number;
};

export type GetTrainingSessionQuestionsRequestModel = Request<
  { trainingSessionId: number },
  any,
  GetTrainingSessionQuestionsRequestBody
>;

export type GetTrainingSessionQuestionsResponseModel = Response<
  GetTrainingSessionQuestionsResponseBody,
  GetTrainingSessionQuestionsLocals
>;
