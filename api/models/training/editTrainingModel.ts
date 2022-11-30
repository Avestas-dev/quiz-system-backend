import { Request } from "express";
import { extractReqBody } from "../../helpers/typescriptHelpers";

export type EditTrainingRequestModel = Request<
  any,
  any,
  {
    name: string;
    visibility: boolean;
    trainingId: number;
    tagIds: number[];
  }
>;

export const EditTrainingRequestExample: extractReqBody<EditTrainingRequestModel> =
  {
    trainingId: 1,
    name: "Training name",
    visibility: true,
    tagIds: [1],
  };
