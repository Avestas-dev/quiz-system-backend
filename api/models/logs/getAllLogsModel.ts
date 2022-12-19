import { Logs } from ".prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type GetAllLogsRequestModel = Request<any, any, any>;

export type GetAllLogsResponseModel = Response<
  { items: Logs[]; pageNumber: number; pageSize: number; totalPages: number },
  commonLocals
>;
const date = new Date();
export const GetAllLogsResponseExample: extractResBody<GetAllLogsResponseModel> =
  {
    items: [
      {
        body: "string",
        createdAt: date,
        headers: "string",
        id: 1,
        params: "string",
        query: "string",
        response: "string",
        status: 500,
        updatedAt: date,
        url: "/training",
        userId: 1,
      },
    ],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 7,
  };
