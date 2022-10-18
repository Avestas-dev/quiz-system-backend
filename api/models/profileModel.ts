import { User } from "@prisma/client";
import { Response } from "express";

type ProfileLocals = {
  user: Pick<User, "email" | "id">;
};

export type ProfileResponseModel = Response<any, ProfileLocals>;
