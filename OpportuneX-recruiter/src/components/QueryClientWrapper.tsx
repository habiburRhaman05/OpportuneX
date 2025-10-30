

import React, { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/api/queryClient";

export const queryClientIns = createQueryClient();

interface QueryClientWrapperProps {
  children: ReactNode;
}

const QueryClientWrapper: React.FC<QueryClientWrapperProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClientIns}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryClientWrapper;
