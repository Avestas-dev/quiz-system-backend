import { Response } from "express";
import { errorType } from "../consts/errorTypes";

export const validationErrorHandler = (
  t: Response,
  err: keyof typeof errorType
) => {
  const { message, status } = errorType[err];
  return t.status(status).json({ message: message, status: status, code: err });
};
