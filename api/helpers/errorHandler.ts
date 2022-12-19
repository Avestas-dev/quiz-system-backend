import { Response } from "express";
import { errorType } from "../consts/errorTypes";
import { prisma } from "./prisma";
const anonymiseURLS = [
  "/login",
  "/register",
  "/refresh",
  "/login-google",
  "/register-google",
];
export const validationErrorHandler = async (
  response: Response,
  err: keyof typeof errorType
) => {
  const { message, status } = errorType[err];

  // Remove sensitive information
  delete response.req.headers["authorization"];

  // Convert JSON to string to be able to save it in database
  const stringBody = JSON.stringify(response.req.body);
  const stringParams = JSON.stringify(response.req.params);
  const stringQuery = JSON.stringify(response.req.query);
  const stringHeaders = JSON.stringify(response.req.headers);

  // Check whether url is in anonymised list
  const shouldAnonymise = !!anonymiseURLS.find((u) => u === response.req.url);

  await prisma.logs.create({
    data: {
      body:
        Object.keys(response.req.body).length && !shouldAnonymise
          ? stringBody
          : "",
      params:
        Object.keys(response.req.params).length && !shouldAnonymise
          ? stringParams
          : "",
      query:
        Object.keys(response.req.query).length && !shouldAnonymise
          ? stringQuery
          : "",
      url: response.req.url,
      headers: stringHeaders,
      status: status,
      response: message,
      userId: response.req.res?.locals?.user?.id,
    },
  });

  return response
    .status(status)
    .json({ message: message, status: status, code: err });
};
