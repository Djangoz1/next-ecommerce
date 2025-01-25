"use client";
import { useQuery } from "@tanstack/react-query";

export const useApi = <T>({
  path,
  params,
  method = "GET",
  enabled = true,
  queryKey,
}: {
  queryKey?: string;
  enabled?: boolean;
  path: `/${string}`;
  params?: Record<string, string | number | boolean | string[]>;
  method: "GET" | "POST" | "PUT" | "DELETE";
}) => {
  return useQuery({
    enabled,
    queryKey: ["api", path, queryKey],
    queryFn: async () => {
      const queryString = params
        ? "?" + new URLSearchParams(params as Record<string, string>).toString()
        : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}${queryString}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          // body: params ? JSON.stringify(params) : undefined,
        }
      );
      if (!res.ok) {
        throw new Error("Error fetching items");
      }
      const data = await res.json();

      return data.result as T;
    },
  });
};
