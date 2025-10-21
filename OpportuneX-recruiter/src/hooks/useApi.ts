import { useQuery, useMutation, QueryKey } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { z } from "zod";
import { createApi } from "@/api/client";
import http from "@/api/http";

import { toast } from "./use-toast";
import { delay } from "@/utils/delay";
import { queryClientIns } from "@/components/QueryClientWrapper";
// axios instance

const api = createApi(http);

interface ApiQueryOptions<T> {
  url: string;
  queryKey: QueryKey;
  retry?: boolean | number;
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
  refetchOnMount?: boolean | "always";
}

interface ApiMutationOptions<TPayload, TResponse> {
  url: string;
  method?: "post" | "put" | "delete" | "get";
  data?: z.ZodSchema<TPayload>;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: AxiosError) => void;
  invalidateQueryKey?: QueryKey[];
  removeQueryKey?: QueryKey[];
}

// -------- Query Hook --------
export function useApiQuery<T>({
  url,
  queryKey,
  staleTime,
  retry,
  enabled,
  cacheTime,
  refetchOnMount,
}: ApiQueryOptions<T>) {
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: async ({ signal }) => {
      try {
        return await api.get(url, {
          signal: signal,
        });
      } catch (err: any) {
        console.log("error to get", err);
      }
    },
    retry,
    enabled,
    gcTime: cacheTime ? cacheTime * 1000 * 60 : 0,
    staleTime: staleTime ? staleTime * 1000 * 60 : 0, // 5 minutes fresh
    // always refetch on mount
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });
}

// -------- Mutation Hook --------
export function useApiMutation<TPayload, TResponse>({
  url,
  method = "post",
  onSuccess,
  onError,
  invalidateQueryKey = [],
  removeQueryKey = [],
}: ApiMutationOptions<TPayload, TResponse>) {
  return useMutation<TResponse, AxiosError, TPayload>({
    mutationFn: async (payload?: TPayload | null) => {
      await delay(1500);

      switch (method) {
        case "get":
          return api.get(url);
        case "post":
          return api.post(url, payload);
        case "put":
          return api.put(url, payload);
        case "delete":
          return api.del(url);
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    },
    onError(error) {
      if (error.message === "Token Not Found") {
        window.location.reload();
      }

      toast({
        title: error?.message || "somethink went wrong",
        variant: "destructive",
      });
      if (onError) onError(error);
    },
    onSuccess(data: any) {
      queryClientIns.invalidateQueries({
        queryKey: invalidateQueryKey,
      });

      toast({
        title: data?.message || "Success",
        variant: "default",
        className: "bg-green-600",
      });
      if (onSuccess) onSuccess(data);
    },
  });
}
