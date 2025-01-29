import { UseQueryResult } from "@tanstack/react-query";

export type BaseHookParams = {
  enabled?: boolean;
  params: Record<string, string | number | undefined>;
  filters?: {
    limit?: number;
  };
};

export type BaseHookResult<T> = T extends (
  ...args: any[]
) => UseQueryResult<infer U, any>
  ? U
  : never;
