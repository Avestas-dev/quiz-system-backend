import { Tag } from ".prisma/client";
import { Request, Response } from "express";

export type GetAllTagsForTrainingRequestModel = Request<
  { trainingId: number },
  any,
  any
>;

export type GetAllTagsForTrainingResponseModel = Response<Tag[], any>;
