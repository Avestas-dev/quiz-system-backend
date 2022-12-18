import { User } from "@prisma/client";
import { Response } from "express";
import { extractResBody } from "../helpers/typescriptHelpers";
import { commonLocals } from "./commonLocals";

type ProfileLocals = Pick<User, "email" | "id" | "isAdmin">;

export type ProfileResponseModel = Response<ProfileLocals, commonLocals>;

export const ProfileResponseExample: extractResBody<ProfileResponseModel> = {
  email: "kamilporeba@hotmail.com",
  id: 1,
  isAdmin: true,
};
