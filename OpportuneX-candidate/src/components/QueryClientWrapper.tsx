import { createQueryClient } from "@/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export const queryClientIns = createQueryClient();
const QueryClientWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClientIns}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryClientWrapper;
