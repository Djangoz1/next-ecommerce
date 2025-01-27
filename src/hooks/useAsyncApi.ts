import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useAsyncApi = ({
  path: _path,
  invalidateQueries: _invalidateQueries,
  method: _method = "POST",
}: {
  path?: `/${string}`;
  invalidateQueries?: string[][];

  method?: "GET" | "POST" | "PUT" | "DELETE";
}) => {
  const client = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      params,
      path = _path,
      method = _method,
      invalidateQueries = _invalidateQueries,
      toast: _toast,
      headers,
    }: {
      params: Record<string, string | number | boolean | string[]> | FormData;
      path?: `/${string}`;
      method?: "GET" | "POST" | "PUT" | "DELETE";
      invalidateQueries?: string[][];
      headers?: Record<string, string> | false;
      toast?: {
        title?: string;
        description: string;
        variant?: "destructive" | "default";
      };
    }) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
          method,
          headers:
            headers === false
              ? undefined
              : headers || {
                  "Content-Type": "application/json",
                },
          body:
            headers !== undefined
              ? (params as FormData)
              : JSON.stringify(params),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(res.statusText || "Error fetching items");
        }

        if (invalidateQueries) {
          invalidateQueries.forEach((keys) => {
            client.invalidateQueries({ queryKey: keys });
          });
        }

        if (_toast) {
          if (!_toast.description) throw new Error("Missing description alert");
          toast({
            title: _toast?.title || "Succès",
            description: _toast?.description,
            variant: _toast?.variant || "default",
          });
        }

        return data.result;
      } catch (error) {
        console.log({
          error: error instanceof Error ? error.message : error,
        });
        toast({
          title: `Erreur ${path}`,
          description:
            error instanceof Error
              ? error.message
              : "Une erreur est survenue lors de la récupération des données",
          variant: "destructive",
        });
        throw error;
      }
    },
  });
};
