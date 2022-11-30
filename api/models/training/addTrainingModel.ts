import { Training } from "@prisma/client";
import { Request, Response } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type AddTrainingRequestModel = Request<
  any,
  any,
  {
    name: string;
    visibility: boolean;
    tagIds: number[];
  }
>;

export type AddTrainingResponseModel = Response<Training, commonLocals>;

export const AddTrainingRequestExample: extractReqBody<AddTrainingRequestModel> =
  {
    name: "Training name",
    visibility: true,
    tagIds: [1],
  };
