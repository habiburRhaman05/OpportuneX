
import { toNormalizedError } from "@/api/errors";
import { getData } from "@/lib/utils";
import { delay } from "@/utils/delay";
import { AxiosInstance, AxiosRequestConfig } from "axios";

export type RequestInitLike = {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  params?: Record<string, any>;
};

export const createApi = (http: AxiosInstance) => ({
  async get<T = any>(url: string, config?: RequestInitLike): Promise<T> {
    try {
      const res = await http.get<T>(url, config as AxiosRequestConfig);
      return res.data;
    } catch (e) {
      console.log(e);

      throw toNormalizedError(e);
    }
  },

  async post<T = any>(
    url: string,
    body?: unknown,
    config?: RequestInitLike
  ): Promise<T> {
    try {
      const res = await http.post<T>(url, body, config as AxiosRequestConfig);
      return res.data;
    } catch (e) {
      throw toNormalizedError(e);
    }
  },

  async put<T = any>(
    url: string,
    body?: unknown,
    config?: RequestInitLike
  ): Promise<T> {
    try {
      const res = await http.put<T>(url, body, config as AxiosRequestConfig);
      return res.data;
    } catch (e) {
      throw toNormalizedError(e);
    }
  },

  async del<T = any>(url: string, config?: RequestInitLike): Promise<T> {
    try {
      const res = await http.delete<T>(url, config as AxiosRequestConfig);
      return res.data;
    } catch (e) {
      throw toNormalizedError(e);
    }
  },
});
