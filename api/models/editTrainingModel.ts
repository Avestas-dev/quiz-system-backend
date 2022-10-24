import { Request } from "express";

type EditTrainingRequestBody = {
  name: string;
  visibility: boolean;
  trainingId: number;
};

export type EditTrainingRequestModel = Request<
  any,
  any,
  EditTrainingRequestBody
>;
