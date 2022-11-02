import { User } from "@prisma/client";
import { Request, Response } from "express";

export type GetUserTrainingSessionRequestModel = Request<
  { trainingSessionId: number },
  any,
  { trainingSessionId: number; questionId: number; questionAnswerIds: number[] }
>;

export type GetDoneTrainingSessionResponseModel = Response<
  {
    id: number;
    finished: boolean;
    trainingId: number;
    trainingName: string;
    correctQuestionCount: number;
    trainingQuestions: Array<{
      trainingQuestionId: number;
      answerStatus: "correct" | "incorrect" | "not_answered";
    }>;
  }[],
  { user: User }
>;
