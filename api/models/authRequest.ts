import { User } from "@prisma/client";
import { Response } from "express";
type LoginLocals = {
  user: User;
};

/** This response is valid after all routes with authorization check. */
export type AuthResponse = Response<any, LoginLocals>;
