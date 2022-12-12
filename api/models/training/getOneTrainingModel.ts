import { Training, TrainingSession, User } from "@prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
const date = new Date();

type GetOneTrainingResponseBody = Training & {
  likedTraining: boolean;
  user: Pick<User, "id" | "email">;
  tagTraining: { tagId: number; tagName: string }[];
  trainingSession: Array<
    Pick<TrainingSession, "id" | "createdAt" | "finished" | "updatedAt">
  >;
};

export type GetOneTrainingRequestModel = Request<
  {
    trainingId: string;
  },
  any
>;

export type GetOneTrainingResponseModel = Response<
  GetOneTrainingResponseBody,
  commonLocals
>;

export const GetOneTrainingResponseExample: extractResBody<GetOneTrainingResponseModel> =
  {
    id: 1,
    createdAt: date.toISOString() as unknown as Date,
    name: "test",
    updatedAt: date.toISOString() as unknown as Date,
    userId: 1,
    visibility: true,
    likedTraining: true,
    user: {
      email: "kamilporeba@hotmail.com",
      id: 1,
    },
    tagTraining: [
      {
        tagId: 1,
        tagName: "tagName",
      },
    ],
    trainingSession: [
      {
        id: 1,
        createdAt: date.toISOString() as unknown as Date,
        finished: false,
        updatedAt: date.toISOString() as unknown as Date,
      },
    ],
  };
