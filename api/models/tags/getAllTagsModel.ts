import { Tag } from ".prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type GetAllTagsRequestModel = Request<any, any, any>;

export type GetAllTagsResponseModel = Response<Tag[], commonLocals>;

export const GetAllTagsResponseExample: extractResBody<GetAllTagsResponseModel> =
  [
    { id: 1, name: "testTag", tagStatus: "accepted" },
    { id: 2, name: "testTag2", tagStatus: "rejected" },
    { id: 3, name: "testTag3", tagStatus: "pending" },
  ];
