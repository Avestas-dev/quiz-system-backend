import { Request, Response } from "express";

type Impossible<K extends keyof any> = {
  [P in K]: never;
};

export type NoExtraProperties<T, U extends T = T> = U extends Array<infer V>
  ? NoExtraProperties<V>[]
  : U & Impossible<Exclude<keyof U, keyof T>>;

export type extractResBody<T> = NonNullable<
  T extends Response ? Parameters<T["send"]>[0] : never
>;

export type extractReqBody<T> = NonNullable<
  T extends Request ? T["body"] : never
>;
