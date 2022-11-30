import { Tag } from ".prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";

export type GetAllTagsForTrainingRequestModel = Request<
  { trainingId: number },
  any,
  any
>;

export type GetAllTagsForTrainingResponseModel = Response<Tag[], any>;

export const GetAllTagsForTrainingResponseExample: extractResBody<GetAllTagsForTrainingResponseModel> =
  [
    { id: 1, name: "testTag", tagStatus: "accepted" },
    { id: 2, name: "testTag2", tagStatus: "rejected" },
    { id: 3, name: "testTag3", tagStatus: "pending" },
  ];
