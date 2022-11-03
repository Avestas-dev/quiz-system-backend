import { Request, Response } from "express";

export type AddTagRequestModel = Request<any, any, { name: string }>;

export type AddTagResponseModel = Response<any, any>;
