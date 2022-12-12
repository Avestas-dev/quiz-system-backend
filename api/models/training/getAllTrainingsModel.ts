import { Training, TrainingSession, User } from "@prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
const date = new Date();

export type GetAllTrainingsRequestModel = Request<any, any, any>;

export type GetAllTrainingsResponseModel = Response<
  (Training & {
    likedTraining: boolean;
    user: Pick<User, 'id' | "email">
    tagTraining: { tagId: number; tagName: string }[];
    trainingSession: Array<
      Pick<TrainingSession, "id" | "createdAt" | "finished" | "updatedAt">
    >;
  })[],
  commonLocals
>;
export const GetAllTrainingsResponseExample: extractResBody<GetAllTrainingsResponseModel> =
  [
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
    },
  ];
