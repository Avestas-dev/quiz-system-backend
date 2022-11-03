import { Tag } from ".prisma/client";
import { Request, Response } from "express";

export type GetAllTagsRequestModel = Request<any, any, any>;

export type GetAllTagsResponseModel = Response<Tag[], any>;
