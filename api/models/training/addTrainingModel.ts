import { Request } from "express";

type AddTrainingRequestBody = {
  name: string;
  visibility: boolean;
  tagIds: number[];
};

export type AddTrainingRequestModel = Request<any, any, AddTrainingRequestBody>;
