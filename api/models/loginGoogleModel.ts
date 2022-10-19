import { User } from "@prisma/client";
import { Response } from "express";

type LoginGoogleLocals = {
  user: User;
};

export type LoginGoogleResponseModel = Response<any, LoginGoogleLocals>;
