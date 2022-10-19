import { Request } from "express";

type RegisterGoogleRequestBody = {
  tokenId: string;
};

export type RegisterGoogleRequestModel = Request<
  any,
  any,
  RegisterGoogleRequestBody
>;
