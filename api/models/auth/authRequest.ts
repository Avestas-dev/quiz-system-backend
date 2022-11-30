import { Response } from "express";
import { commonLocals } from "../commonLocals";

/** This response is valid after all routes with authorization check. */
export type AuthResponse = Response<any, commonLocals>;
