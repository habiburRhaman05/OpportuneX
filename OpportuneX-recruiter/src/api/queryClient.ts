import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // all queries are considered stale immediately
        refetchOnMount: "always", // always refetch on mount
        // refetchOnWindowFocus: true,
        retry: 1,
        gcTime: 5 * 60 * 1000,
      },
      mutations: {
        retry: (failureCount, error: any) => {
          const status = error?.status;
          if (!status) return failureCount < 1;
          return status >= 500 && status < 600 && failureCount < 1;
        },
      },
    },
  });
