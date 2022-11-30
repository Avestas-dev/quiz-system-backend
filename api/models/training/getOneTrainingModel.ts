import { Training } from "@prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
const date = new Date();

type GetOneTrainingResponseBody = Training & {
  likedTraining: boolean;
  tagTraining: { tagId: number; tagName: string }[];
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
    tagTraining: [
      {
        tagId: 1,
        tagName: "tagName",
      },
    ],
  };
