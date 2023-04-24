import { UseQueryOptions } from "@tanstack/react-query";

export type ExtractTData<T extends (...args: any) => any> =
  ReturnType<T> extends UseQueryOptions<infer TData, any, any> ? TData : never;
