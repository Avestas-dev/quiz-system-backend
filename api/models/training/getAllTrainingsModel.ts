import { Training } from "@prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";
const date = new Date();

export type GetAllTrainingsRequestModel = Request<any, any, any>;

export type GetAllTrainingsResponseModel = Response<
  (Training & {
    likedTraining: boolean;
    tagTraining: { tagId: number; tagName: string }[];
  })[],
  commonLocals
>;
export const GetAllTrainingsResponseExample: extractResBody<GetAllTrainingsResponseModel> =
  [
    {
      id: 1,
      CreatedAt: date.toISOString() as unknown as Date,
      name: "test",
      UpdatedAt: date.toISOString() as unknown as Date,
      userId: 1,
      visibility: true,
      likedTraining: true,
      tagTraining: [
        {
          tagId: 1,
          tagName: "tagName",
        },
      ],
    },
  ];
