import { Request } from "express";

type AddTrainingRequestBody = {
  name: string;
  visibility: boolean;
};

export type AddTrainingRequestModel = Request<any, any, AddTrainingRequestBody>;
