import { User } from ".prisma/client";
import { Request, Response } from "express";

export type GetAllUsersRequestModel = Request<any, any, any>;

export type GetAllUsersResponseModel = Response<
  Pick<
    User,
    | "id"
    | "CreatedAt"
    | "UpdatedAt"
    | "email"
    | "passwordResetDate"
    | "isAdmin"
    | "googleSub"
  >,
  { user: User }
>;
