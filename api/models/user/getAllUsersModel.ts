import { User } from ".prisma/client";
import { Request, Response } from "express";
import { extractResBody } from "../../helpers/typescriptHelpers";
import { commonLocals } from "../commonLocals";

export type GetAllUsersRequestModel = Request<any, any, any>;

export type GetAllUsersResponseModel = Response<
  Array<
    Pick<
      User,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "email"
      | "passwordResetDate"
      | "isAdmin"
      | "googleSub"
    > & { blockedDate?: Date }
  >,
  commonLocals
>;
const date = new Date();
export const GetAllUsersResponseExample: extractResBody<GetAllUsersResponseModel> =
  [
    {
      id: 7,
      createdAt: date.toISOString() as unknown as Date,
      updatedAt: date.toISOString() as unknown as Date,
      email: "kamilporeba5@hotmail.com",
      passwordResetDate: date.toISOString() as unknown as Date,
      isAdmin: true,
      googleSub: null,
      blockedDate: date.toISOString() as unknown as Date,
    },
  ];
