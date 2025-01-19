"use client";
import { useQuery } from "@tanstack/react-query";

export const useApi = ({
  path,
  params,
  method = "GET",
  enabled = true,
}: {
  enabled?: boolean;
  path: `/${string}`;
  params?: any;
  method: "GET" | "POST" | "PUT" | "DELETE";
}) => {
  return useQuery({
    enabled,
    queryKey: ["api", path],
    queryFn: async () => {
      const queryString = params
        ? "?" + new URLSearchParams(params).toString()
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
      let data = await res.json();

      return data.result;
    },
  });
};
