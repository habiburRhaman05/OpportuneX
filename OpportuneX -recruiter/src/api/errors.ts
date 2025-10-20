export type NormalizedError = {
  status?: number;
  code?: string;
  message: string;
  details?: unknown;
  traceId?: string;
};

export const toNormalizedError = (err: unknown): NormalizedError => {
  const ax = err as any;
  if (ax?.isAxiosError) {
    const status = ax.response?.status as number | undefined;
    const data = ax.response?.data;
    let message = ax.message || "Request failed";
    if (data?.message && typeof data.message === "string") message = data.message;
    return {
      status,
      code: data?.code ?? ax.code,
      message,
      details: data?.errors ?? data,
      traceId: ax.response?.headers?.['x-trace-id'],
    };
  }
  return { message: (err as any)?.message ?? "Unknown error" };
};
