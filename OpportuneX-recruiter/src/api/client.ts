// import { toNormalizedError } from "@/lib/errors";
// import { AxiosInstance, AxiosRequestConfig } from "axios";
// import { z } from "zod";

// export type RequestInitLike = {
//   signal?: AbortSignal;
//   headers?: Record<string, string>;
//   params?: Record<string, any>;
// };

// const validate = <T extends z.ZodTypeAny>(
//   schema: T,
//   payload: unknown
// ): z.infer<T> => {
//   const parsed = schema.safeParse(payload);
//   if (!parsed.success) {
//     throw {
//       status: 422,
//       code: "VALIDATION_ERROR",
//       message: "Response validation failed",
//       details: parsed.error.flatten(),
//     };
//   }
//   return parsed.data;
// };

// export const createApi = (http: AxiosInstance) => ({
//   async get<Out extends z.ZodTypeAny>(
//     url: string,
//     out: Out,
//     config?: RequestInitLike
//   ) {
//     try {
//       const res = await http.get(url, config as AxiosRequestConfig);
//       // return validate(out, res.data);
//       return res.data;
//     } catch (e) {
//       throw toNormalizedError(e);
//     }
//   },

//   async post<In extends z.ZodTypeAny, Out extends z.ZodTypeAny>(
//     url: string,
//     input: In,
//     out: Out,
//     body: z.input<In>,
//     config?: RequestInitLike
//   ) {
//     try {
//       const parsed = input.parse(body);
//       const res = await http.post(url, parsed, config as AxiosRequestConfig);
//       return validate(out, res.data);
//     } catch (e) {
//       throw toNormalizedError(e);
//     }
//   },

//   async put<In extends z.ZodTypeAny, Out extends z.ZodTypeAny>(
//     url: string,
//     input: In,
//     out: Out,
//     body: z.input<In>,
//     config?: RequestInitLike
//   ) {
//     try {
//       const parsed = input.parse(body);
//       const res = await http.put(url, parsed, config as AxiosRequestConfig);
//       return validate(out, res.data);
//     } catch (e) {
//       throw toNormalizedError(e);
//     }
//   },

//   async del<Out extends z.ZodTypeAny>(
//     url: string,
//     out: Out,
//     config?: RequestInitLike
//   ) {
//     try {
//       const res = await http.delete(url, config as AxiosRequestConfig);
//       return validate(out, res.data);
//     } catch (e) {
//       throw toNormalizedError(e);
//     }
//   },
// });
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
