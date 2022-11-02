import { User } from "@prisma/client";
import { Request, Response } from "express";

export type GetUserTrainingSessionsRequestModel = Request<
  any,
  any,
  { trainingSessionId: number; questionId: number; questionAnswerIds: number[] }
>;

export type GetDoneTrainingSessionsResponseModel = Response<
  {
    id: number;
    finished: boolean;
    trainingId: number;
    trainingName: string;
    correctCount: number;
    trainingQuestions: Array<{
      trainingQuestionId: number;
      answerStatus: 'correct' | 'incorrect' | 'not_answered' ;
    }>;
  }[],
  { user: User }
>;
