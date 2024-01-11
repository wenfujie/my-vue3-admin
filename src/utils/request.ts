import axios from "axios";
import { message as $message } from "ant-design-vue";
import type { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";
import { Storage } from "@/utils/Storage";

const UNKNOWN_ERROR = "未知错误，请重试";

/** 真实请求的路径前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_API;
/** mock请求路径前缀 */
const baseMockUrl = import.meta.env.VITE_MOCK_API;

const service = axios.create({
  // baseURL: baseApiUrl,
  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    const token = Storage.get(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      // 请求头token信息，请根据实际情况进行修改
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 0) {
      const errMessage = res.message || UNKNOWN_ERROR;
      const error = new Error(errMessage) as Error & { code: any };

      $message.error(errMessage);
      error.code = res.code;
      return Promise.reject(error);
    }
    return res;
  },
  (error) => {
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
    $message.error({ content: errMsg, key: errMsg });
    error.message = errMsg;
    return Promise.reject(error);
  }
);

export interface RequestOptions {
  /** 是否mock数据请求 */
  isMock?: boolean;
}

export type Response<T = any> = {
  code: number;
  message: string;
  data: T;
};

export type BaseResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(
  config: AxiosRequestConfig,
  options: RequestOptions = {}
): Promise<T> => {
  const { isMock } = options;
  config.url = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;

  try {
    const res = await service.request(config);
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
